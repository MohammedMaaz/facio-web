import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { selectUser } from "../../models/user";
import styles from "./index.module.scss";

export default function Home() {
  const name = useAppSelector(selectUser)?.name;

  return (
    <div className={styles.container}>
      <h1>Welcome</h1>
      <h3>Onboard</h3>
      <h2>{name}!</h2>
      <p>
        <span>Congratulations! </span>Your <span last-char="o">Faci</span>{" "}
        account is now active. To visit your profile please click{" "}
        <Link to="/profile">here</Link>
      </p>
    </div>
  );
}
