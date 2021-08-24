import scss from "../styles/export.module.scss";

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
  } else if (color.startsWith("rgb(")) {
    color = color.replace("rgb", "rgba").slice(0, -1) + percent + ")";
  }

  return color;
};
