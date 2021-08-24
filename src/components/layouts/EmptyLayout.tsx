import React, { ReactNode } from "react";
import styles from "./index.module.scss";

export default function EmptyLayout({ children }: { children: ReactNode }) {
  return <div className={styles.empty}>{children}</div>;
}
