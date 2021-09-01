import React, { ReactNode } from "react";
import TopMenu from "../TopMenu";
import styles from "./index.module.scss";

export default function EmptyLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className={styles.empty}
    >
      <TopMenu />
      <div style={{ margin: "3rem 0", flex: 1 }}>{children}</div>
    </div>
  );
}
