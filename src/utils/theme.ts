import { sassExports } from ".";
import { AppModel, setTheme } from "../models/app";

const STORAGE_KEY = "__theme__";

function set(name: string) {
  if (!sassExports.theme[name]) return;
  const { store } = require("../store");

  const root = document.documentElement;
  const newTheme = get();

  for (const key in sassExports.theme[name]) {
    root.style.setProperty(`--${key}`, `${sassExports.theme[name][key]}`);
    newTheme.value[key] = sassExports.theme[name][key];
  }
  newTheme.name = name;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newTheme));
  store.dispatch(setTheme(newTheme));
}

function get(): AppModel["theme"] {
  const storedTheme = localStorage.getItem(STORAGE_KEY);
  if (storedTheme) return JSON.parse(storedTheme);

  const theme = { name: "default", value: { ...sassExports.theme.default } };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  return theme;
}

const Theme = {
  set,
  get,
};

export default Theme;
