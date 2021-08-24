import React, { useCallback } from "react";
import { useTheme } from "../../hooks/useTheme";
import styles from "./index.module.scss";
import Switch from "react-switch";
import { sassExports } from "../../utils";

export default function ThemeSwitch() {
  const { name, theme, setTheme } = useTheme();

  const onChange = useCallback((checked) => {
    setTheme(checked ? "dark" : "default");
  }, []);

  return (
    <div
      title={`Toggle ${name === "dark" ? "light" : "dark"} mode`}
      style={{
        position: "absolute",
        top: 8,
        right: 8,
        zIndex: 10,
      }}
    >
      <Switch
        checked={name === "dark"}
        onChange={onChange}
        handleDiameter={14}
        offColor={sassExports.theme.dark.bg_color}
        onColor={sassExports.theme.default.bg_color}
        offHandleColor={theme.primary_color}
        onHandleColor={theme.primary_color}
        activeBoxShadow={"0px 0px 0px 0px transparent"}
        uncheckedIcon={false}
        checkedIcon={false}
        height={22}
        width={38}
        borderRadius={99}
      />
    </div>
  );
}
