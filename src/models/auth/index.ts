import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Auth from "../../services/auth";
import { RootState } from "../../store";
import { history } from "../../utils";
import { getRefreshToken } from "../../utils/api";
import { Status } from "../../utils/statusHandler";
import { getProfile, setUser, setVerifivationStatus, unsetUser } from "../user";
import {
  getNextRefreshTime,
  isNearToExpiry,
  logoutListener,
  scheduleNextRefresh,
} from "./helpers";

//types
export interface Token {
  token: string | null;
  expires: string;
}

export interface AuthState {
  accessToken: Token;
  refreshToken: Token;
  logoutListenerStarted: boolean;
  loginStatus: Status;
  signupStatus: Status;
  logoutStatus: Status;
  sendVerificationEmailStatus: Status;
  forgotPasswordStatus: Status;
  resetPasswordStatus: Status;
}

export const LSKeys = {
  refreshToken: "refreshToken",
  remember: "remember",
  logout: "logout",
};

//initial state
const initialState: AuthState = {
  accessToken: { token: "", expires: "" },
  refreshToken: { token: "", expires: "" },
  logoutListenerStarted: false,
  loginStatus: "idle",
  signupStatus: "idle",
  logoutStatus: "idle",
  sendVerificationEmailStatus: "idle",
  forgotPasswordStatus: "idle",
  resetPasswordStatus: "idle",
};

//thunks
export const login = createAsyncThunk(
  "auth/login",
  async (
    {
      remember,
      ...args
    }: Parameters<typeof Auth.login>[0] & { remember: boolean },
    { dispatch }
  ) => {
    const result = await Auth.login(args);
    dispatch(setUser(result.user));

    if (remember) {
      localStorage.setItem(LSKeys.remember, "true");
      localStorage.setItem(LSKeys.refreshToken, result.tokens.refresh.token);
    }
    return result.tokens;
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    {
      remember,
      ...args
    }: Parameters<typeof Auth.signup>[0] & { remember: boolean },
    { dispatch }
  ) => {
    const result = await Auth.signup(args);
    dispatch(setUser(result.user));

    if (remember) {
      localStorage.setItem(LSKeys.remember, "true");
      localStorage.setItem(LSKeys.refreshToken, result.tokens.refresh.token);
    }

    toast.success("Account created successfully!");
    return result.tokens;
  }
);

export const sendVerificationEmail = createAsyncThunk(
  "auth/sendVerificationEmail",
  async (_, { getState }) => {
    await Auth.send_verification_email();
    toast.success(
      `A verification email has been sent to ${getState().user.user?.email}`
    );
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (args: Parameters<typeof Auth.verify_email>[0], { dispatch }) => {
    return Auth.verify_email(args)
      .then(() => {
        dispatch(setVerifivationStatus(true));
        toast.success("Your email has been successfully verified!");
      })
      .finally(() => {
        history.push("/");
      });
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (args: Parameters<typeof Auth.forgot_password>[0]) => {
    await Auth.forgot_password(args);
    toast.success(`A password reset email has been sent to ${args.email}`);
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (args: Parameters<typeof Auth.reset_password>[0], { dispatch }) => {
    await Auth.reset_password(args);
    toast.success("Your password has been successfully updated!");
    dispatch(logout(true));
    history.push("/login");
  }
);

export const startBgRefreshLoop = createAsyncThunk(
  "auth/startBgRefreshLoop",
  async (forceRefresh: boolean | undefined = false, { getState, dispatch }) => {
    const { accessToken, logoutListenerStarted } = getState().auth;
    //start logout listener if not already started
    if (!logoutListenerStarted) {
      window.addEventListener("storage", logoutListener);
      dispatch(authSlice.actions.setLogoutListenerStarted(true));
    }

    //avoid duplicate calls
    if (!forceRefresh && !isNearToExpiry(accessToken.expires)) {
      scheduleNextRefresh(getNextRefreshTime(accessToken.expires));
      return;
    }

    const token = getRefreshToken();
    //if token is null then this means it is logout state
    if (token === null) {
      dispatch(logout());
      return;
    }

    //if refresh token is present then try to get an access token
    let result;
    try {
      result = await Auth.refresh_token({
        refreshToken: token,
      });
    } catch (error) {
      //need to resolve undescisive state to a final state (in this case logout)
      if (selectIsLoggedIn(getState()) === "undecisive")
        await dispatch(logout());
      throw error;
    }
    if (localStorage.getItem(LSKeys.remember) === "true")
      localStorage.setItem(LSKeys.refreshToken, result.refresh.token);

    axios.defaults.headers.Authorization = `Bearer ${result.access.token}`;
    //fetch and set user profile if not already
    await dispatch(getProfile());

    //schedule next invokation of silent refresh 1 sec earlier than access token expiry only if not logged out
    scheduleNextRefresh(getNextRefreshTime(result.access.expires));
    return { refreshToken: result.refresh, accessToken: result.access };
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (forceOnOtherTabs: boolean | undefined = false, { dispatch }) => {
    //remove event listener from this window first
    window.removeEventListener("storage", logoutListener);
    dispatch(authSlice.actions.setLogoutListenerStarted(false));

    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        await Auth.logout({ refreshToken });
      } catch (error) {
        //ignore api errors in logout
      }
    }

    if (forceOnOtherTabs) {
      //trigger logout on other tabs
      localStorage.setItem(LSKeys.logout, "true");
    }

    dispatch(unsetUser());
    Object.values(LSKeys).forEach((val) => localStorage.removeItem(val));
  }
);

//slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogoutListenerStarted(state, action: PayloadAction<boolean>) {
      state.logoutListenerStarted = action.payload;
    },
    clearRefreshToken(state) {
      state.refreshToken.token = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
      })
      .addCase(logout.fulfilled, (state) => {
        state.accessToken.token = null;
        state.refreshToken.token = null;
      })
      .addCase(startBgRefreshLoop.fulfilled, (state, action) => {
        if (action.payload) {
          state.accessToken = action.payload.accessToken || state.accessToken;
          state.refreshToken =
            action.payload.refreshToken || state.refreshToken;
        }
      }),
});

//selectors
export const selectIsLoggedIn = (state: RootState) => {
  switch (state.auth.accessToken.token) {
    case null:
      return "loggedOut";
    case "":
      return "undecisive";
    default:
      return "loggedIn";
  }
};

//default export
export default authSlice.reducer;
