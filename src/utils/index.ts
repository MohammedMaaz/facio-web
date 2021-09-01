import scss from "../styles/export.module.scss";
import { createBrowserHistory } from "history";

export const sassExports = (function () {
  const sass: any = {};
  for (let [key, val] of Object.entries(scss)) {
    sass[key] = JSON.parse(val.slice(1, -1));
  }
  return sass;
})();

export const opacity = (color: string, percent: number) => {
  percent = Math.max(0, Math.min(255, Math.round(percent * 255)));

  if (color.startsWith("#")) {
    if (color.length === 4) color += color.slice(1);
    color += percent.toString(16);
  } else if (color.startsWith("rgb")) {
    color = color.replace("rgb", "rgba").slice(0, -1) + percent + ")";
  }

  return color;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export const history = createBrowserHistory();

export const rgb2hex = (rgb: string) => {
  const res = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d\.]+))?\)$/);
  if (!res || !res.length) return "#000000";

  function hex(x: string) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }

  return (hex(res[1]) + hex(res[2]) + hex(res[3])).toUpperCase();
};

export const mixColors = (
  color_1: string,
  color_2: string,
  weight: number = 50
) => {
  function d2h(d: number) {
    return d.toString(16);
  }
  function h2d(h: string) {
    return parseInt(h, 16);
  }

  function getHex(c: string) {
    if (c.startsWith("#")) {
      c = c.slice(1);
      if (c.length === 3) c = c.repeat(2);
    } else if (c.startsWith("rgb")) c = rgb2hex(c);
    return c;
  }

  color_1 = getHex(color_1);
  color_2 = getHex(color_2);

  let color = "#";

  for (let i = 0; i <= 5; i += 2) {
    const v1 = h2d(color_1.substr(i, 2)),
      v2 = h2d(color_2.substr(i, 2));
    let val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));

    while (val.length < 2) {
      val = "0" + val;
    }

    color += val;
  }

  return color;
};
