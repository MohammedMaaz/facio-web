import React, { ReactNode } from "react";
import ThemeSwitch from "../ThemeSwitch";
import styles from "./index.module.scss";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles.auth} ${styles.empty}`}>
      <div>{children}</div>
    </div>
  );
}
