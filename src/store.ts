import {
  configureStore,
  AsyncThunkPayloadCreator,
  AsyncThunk,
} from "@reduxjs/toolkit";
import appReducer, { AppState } from "./models/app";
import authReducer, { AuthState } from "./models/auth";
import userReducer, { UesrState } from "./models/user";
import { errorHandlerMiddleware } from "./utils/errorHandler";
import { statusHandlerEnahncer } from "./utils/statusHandler";

//NOTE: require store lazily in models or dependencies of models to avoid circular dependecies
export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(errorHandlerMiddleware),
  enhancers: [statusHandlerEnahncer],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = {
  app: AppState;
  auth: AuthState;
  user: UesrState;
};

declare module "@reduxjs/toolkit" {
  type AsyncThunkConfig = {
    state?: unknown;
    dispatch?: AppDispatch;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
  };

  function createAsyncThunk<
    Returned,
    ThunkArg = void,
    ThunkApiConfig extends AsyncThunkConfig = {
      state: RootState;
    }
  >(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<
      Returned,
      ThunkArg,
      ThunkApiConfig
    >,
    options?: any
  ): AsyncThunk<Returned, ThunkArg, ThunkApiConfig>;
}
