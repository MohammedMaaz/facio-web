import { useSelector } from "react-redux";
import { selectTheme } from "../models/app";
import Theme from "../utils/theme";

export const useTheme = () => {
  const theme = useSelector(selectTheme);
  return { theme: theme.value, name: theme.name, setTheme: Theme.set };
};
