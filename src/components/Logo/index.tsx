import React from "react";
import styles from "./index.module.scss";
import logoLight from "../../assets/images/logo_light.svg";
import logoDark from "../../assets/images/logo_dark.svg";
import { useTheme } from "../../hooks/useTheme";
import { Link } from "react-router-dom";

export default function Logo(props: React.HTMLAttributes<HTMLImageElement>) {
  const { name } = useTheme();

  //to give transition effect to the logo image when switching theme
  const activeStyles = {
    filter: "alpha(opacity=100)",
    opacity: 1,
  };
  const inActiveStyles = {
    filter: "alpha(opacity=0)",
    opacity: 0,
  };

  return (
    <Link className={styles.container} to="/">
      <img
        {...props}
        className={styles.logo}
        style={name === "dark" ? activeStyles : inActiveStyles}
        alt="logo"
        src={logoLight}
      />
      <img
        {...props}
        className={`${styles.logo} ${styles.logo2}`}
        style={name !== "dark" ? activeStyles : inActiveStyles}
        alt="logo"
        src={logoDark}
      />
    </Link>
  );
}
