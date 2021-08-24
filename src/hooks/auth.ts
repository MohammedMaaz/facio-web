import { selectLoggedIn } from "../models/auth";
import { useAppSelector } from "./redux";

export const useAuth = () => {
  const isLoggedIn = useAppSelector(selectLoggedIn);
  return { isLoggedIn };
};
