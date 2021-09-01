import React from "react";
import { useTheme } from "../../hooks/useTheme";
import { mixColors } from "../../utils";
import Hover from "../Hover";
import Spin from "../Spin";
import styles from "./index.module.scss";

export interface ButtonProps {
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
  type?: "primary" | "danger" | "warning" | "success";
  filled?: boolean;
}

export default function Button({
  size = "medium",
  type = "primary",
  filled = true,
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  const width = theme[`font_${size}`];
  const disabled = props.disabled || props.loading;
  const color = theme[`${type}_color`];

  return (
    <Hover
      hoverStyle={{
        boxShadow: `0 0 23px 3px ${mixColors(theme.smoke, color, 15)}`,
      }}
    >
      <button
        type={props.htmlType}
        onClick={disabled ? () => {} : props.onClick}
        style={{
          backgroundColor: !filled
            ? theme.bg_color
            : disabled
            ? `${color}8e`
            : color,
          pointerEvents: disabled ? "none" : undefined,
          cursor: disabled ? undefined : "pointer",
          color: filled ? theme.btn_font_color : color,
          fontSize: width,
          padding: `0 ${width}`,
          height: `calc(${width} * 3)`,
          border: filled ? "none" : `1px solid ${color}`,
          boxShadow: `0 0 15px 0 ${mixColors(theme.smoke, color, 40)}`,
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
    </Hover>
  );
}
