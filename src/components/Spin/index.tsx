import React from "react";
import { useTheme } from "../../hooks/useTheme";
import styles from "./index.module.scss";

interface Props {
  size?: "small" | "medium" | "large";
  color?: string;
  style?: React.HTMLAttributes<HTMLDivElement>["style"];
}

export default function Spin({ size = "medium", color, style }: Props) {
  const { theme } = useTheme();
  const width = theme[`spin_${size}`];

  return (
    <div
      style={{
        ...(style || {}),
        width,
        height: width,
      }}
      className={styles.container}
    >
      <div
        style={{
          width: `calc(${width} - (${width}/10))`,
          height: `calc(${width} - (${width}/10))`,
          border: `calc(${width}/10) solid ${color || theme.primary_color}`,
          borderColor: `${color} transparent transparent transparent`,
        }}
      />
      <div />
      <div />
      <div />
    </div>
  );
}
