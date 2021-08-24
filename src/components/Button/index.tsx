import React from "react";
import { useTheme } from "../../hooks/useTheme";
import Spin from "../Spin";
import styles from "./index.module.scss";

interface Props {
  loading?: boolean;
  title: string;
  onClick?: React.HTMLAttributes<HTMLButtonElement>["onClick"];
  style?: React.HTMLAttributes<HTMLButtonElement>["style"];
  htmlType?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >["type"];
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

export default function Button({ size = "medium", ...props }: Props) {
  const { theme } = useTheme();
  const width = theme[`font_${size}`];
  const disabled = props.disabled || props.loading;

  return (
    <button
      type={props.htmlType}
      onClick={disabled ? () => {} : props.onClick}
      style={{
        backgroundColor: disabled
          ? `${theme.primary_color}8e`
          : theme.primary_color,
        pointerEvents: disabled ? "none" : undefined,
        cursor: disabled ? undefined : "pointer",
        fontSize: width,
        padding: `0 ${width}`,
        height: `calc(${width} * 3)`,
        ...(props.style || {}),
      }}
      className={styles.container}
    >
      {props.loading && (
        <Spin
          color="#fff"
          size={["small", "medium"].includes(size) ? "small" : "medium"}
          style={{ marginRight: 12 }}
        />
      )}
      {props.title}
    </button>
  );
}
