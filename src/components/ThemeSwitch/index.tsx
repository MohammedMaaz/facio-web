import React, { useCallback } from "react";
import { useTheme } from "../../hooks/useTheme";
import { IoMoon, IoSunnyOutline } from "react-icons/io5";
import styles from "./index.module.scss";

export default function ThemeSwitch(props: React.HTMLProps<HTMLDivElement>) {
  const { name, setTheme } = useTheme();

  const onToggle = useCallback(() => {
    setTheme(name === "dark" ? "default" : "dark");
  }, [name]);

  return (
    <div title={`Toggle ${name === "dark" ? "light" : "dark"} mode`} {...props}>
      <IoSunnyOutline
        style={{
          opacity: name === "dark" ? 1 : 0,
        }}
        className={styles.icon}
        onClick={onToggle}
      />
      <IoMoon
        style={{
          opacity: name !== "dark" ? 1 : 0,
          marginLeft: "-1.8rem",
        }}
        className={styles.icon}
        onClick={onToggle}
      />
    </div>
  );
}
