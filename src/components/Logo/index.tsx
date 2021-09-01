import React from "react";
import styles from "./index.module.scss";
import logoLight from "../../assets/images/logo_light.svg";
import logoDark from "../../assets/images/logo_dark.svg";
import { useTheme } from "../../hooks/useTheme";
import { Link, LinkProps } from "react-router-dom";
import { useBreakpoint } from "../../hooks/useBreakpoint";

export default function Logo({
  style,
  isSmall = false,
}: {
  style?: LinkProps["style"];
  isSmall?: boolean;
}) {
  const { name } = useTheme();
  const bp = useBreakpoint();

  //to give transition effect to the logo image when switching theme
  const activeStyles = {
    filter: "alpha(opacity=100)",
    opacity: 1,
  };
  const inActiveStyles = {
    filter: "alpha(opacity=0)",
    opacity: 0,
  };

  let width, maxWidth, minWidth;
  if (isSmall) {
    width = "200px";
    if (bp === "phone") {
      maxWidth = width;
      width = "40vw";
      minWidth = "148px";
    }
  } else {
    width = "300px";
    if (bp === "phone") {
      maxWidth = width;
      width = "65vw";
      minWidth = "180px";
    }
  }

  return (
    <Link
      style={{ width, maxWidth, minWidth, ...(style || {}) }}
      className={styles.container}
      to="/"
    >
      <img
        className={styles.logo}
        style={name === "dark" ? activeStyles : inActiveStyles}
        alt="logo"
        src={logoLight}
      />
      <img
        className={`${styles.logo} ${styles.logo2}`}
        style={name !== "dark" ? activeStyles : inActiveStyles}
        alt="logo"
        src={logoDark}
      />
    </Link>
  );
}
