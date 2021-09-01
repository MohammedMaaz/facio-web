import { selectIsLoggedIn } from "../models/auth";
import { useAppSelector } from "./redux";

export const useAuthState = () => {
  return useAppSelector(selectIsLoggedIn);
};
