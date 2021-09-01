import { selectIsEmailVerified } from "../models/user";
import { useAppSelector } from "./redux";

export const useIsEmailVerified = () => {
  return useAppSelector(selectIsEmailVerified);
};
