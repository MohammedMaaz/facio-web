import React from "react";
import { useTheme } from "../../hooks/useTheme";
import { opacity, sassExports } from "../../utils";
import styles from "./index.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  labelStyle?: React.HTMLAttributes<HTMLLabelElement>["style"];
}

export default function Checkbox({ label = "", labelStyle, ...props }: Props) {
  const { name } = useTheme();

  return (
    <label style={labelStyle} className={styles.container}>
      {label}
      <input {...props} type="checkbox" />
      <span
        style={{
          color: opacity(
            sassExports.theme[name === "dark" ? "default" : "dark"].bg_color,
            name === "dark" ? 0.5 : 0.25
          ),
        }}
      ></span>
    </label>
  );
}
