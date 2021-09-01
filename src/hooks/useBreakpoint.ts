import { sassExports } from "../utils";
import useWindowDim from "./useWindowDim";

export function useBreakpoint():
  | "phone"
  | "tab"
  | "desktop"
  | "desktop-fhd"
  | null {
  const { width } = useWindowDim();
  if (!width) return null;

  const {
    mq = {},
    breakpoints = {},
  }: { mq: { [key: string]: any }; breakpoints: { [key: string]: any } } =
    sassExports;

  const regex = new RegExp(Object.keys(breakpoints).join("|"));

  //@ts-ignore
  return Object.entries(mq).find(function ([_, val]) {
    return val.reduce(function (res: any, exp: string) {
      const alias = exp.match(regex);
      if (!alias) return res;
      const predicate = `${width} ${exp.slice(0, alias.index)} ${breakpoints[
        alias[0]
      ].slice(0, -2)}`;

      return res && eval(predicate);
    }, true);
  })[0];
}
