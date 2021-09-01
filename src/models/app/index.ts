import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import Theme from "../../utils/theme";

//types
export interface AppState {
  theme: { name: string; value: { [key: string]: string } };
}

//initial state
const initialState: AppState = { theme: Theme.get() };

//slice
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<AppState["theme"]>) => {
      state.theme = action.payload;
    },
  },
});

//action creators
export const { setTheme } = appSlice.actions;

//selectors
export const selectTheme = (state: RootState) => state.app.theme;

//default export
export default appSlice.reducer;
