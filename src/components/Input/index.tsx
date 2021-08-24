import React, { useState } from "react";
import { useCallback } from "react";
import styles from "./index.module.scss";

interface Props {
  leftIcon?: React.ReactElement;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  containerStyle?: React.HTMLAttributes<HTMLDivElement>["style"];
}

export default function Input({ leftIcon, inputProps, containerStyle }: Props) {
  const [focused, setFocused] = useState(false);

  const onFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocused(false);
  }, []);

  return (
    <div
      className={`${styles.container} ${focused ? styles.focused : ""}`}
      style={containerStyle}
    >
      {leftIcon && <div>{leftIcon}</div>}
      <input
        className={styles.input}
        onFocus={onFocus}
        onBlur={onBlur}
        {...inputProps}
      />
    </div>
  );
}
