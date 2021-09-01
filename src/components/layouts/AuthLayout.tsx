import React, { ReactNode } from "react";
import TopMenu from "../TopMenu";
import styles from "./index.module.scss";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles.empty} ${styles.auth}`}>
      <TopMenu logo={false} />
      <div>{children}</div>
    </div>
  );
}
