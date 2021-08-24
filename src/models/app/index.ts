import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import Theme from "../../utils/theme";

export interface AppModel {
  theme: { name: string; value: { [key: string]: string } };
}

const initialState: AppModel = { theme: Theme.get() };

export const appModel = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<AppModel["theme"]>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = appModel.actions;

export const selectTheme = (state: RootState) => state.app.theme;

export default appModel.reducer;
