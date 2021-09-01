import React from "react";
import Spin from "../Spin";
import styles from "./index.module.scss";

export default function LoadingScreen() {
  return (
    <div className={styles.container}>
      <Spin size="large" />
    </div>
  );
}
