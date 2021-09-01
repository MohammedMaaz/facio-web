import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import UserService from "../../services/user";
import { RootState } from "../../store";
import { Status } from "../../utils/statusHandler";

//types
export interface User {
  role: "user" | "admin";
  isEmailVerified: boolean;
  name: string;
  email: string;
  id: string;
}

export interface UesrState {
  user: User | null;
  getProfileStatus: Status;
  updateProfileStatus: Status;
}

//initial state
const initialState: UesrState = {
  user: null,
  getProfileStatus: "idle",
  updateProfileStatus: "idle",
};

//thunks
export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (forceRefresh: boolean | undefined = false, { dispatch, getState }) => {
    if (forceRefresh || !getState().user.user) {
      const result = await UserService.get();
      dispatch(setUser(result));
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (
    arg: Parameters<typeof UserService.update>[0],
    { getState, dispatch }
  ) => {
    const user = selectUser(getState());

    const updates: { [key: string]: any } = {};
    if (user?.name !== arg.name) updates.name = arg.name;
    if (user?.email !== arg.email) updates.email = arg.email;
    if (arg.password?.length) updates.password = arg.password;

    if (Object.keys(updates).length) {
      const result = await UserService.update(updates as typeof arg);
      dispatch(setUser(result));
      toast.success("Your profile has been updated!");
    }
  }
);

//slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UesrState["user"]>) {
      state.user = action.payload;
    },
    unsetUser(state) {
      state.user = null;
    },
    setVerifivationStatus(state, action: PayloadAction<boolean>) {
      if (state.user) state.user.isEmailVerified = action.payload;
    },
  },
});

//action creators
export const { setUser, unsetUser, setVerifivationStatus } = userSlice.actions;

//selectors
export const selectIsEmailVerified = (state: RootState) =>
  state.user.user?.isEmailVerified;

export const selectUser = (state: RootState) => state.user.user;

//default export
export default userSlice.reducer;
