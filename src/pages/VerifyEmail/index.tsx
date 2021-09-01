import React, { useCallback } from "react";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import { selectUser } from "../../models/user";
import styles from "./index.module.scss";
import art from "../../assets/images/welcome.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { sendVerificationEmail } from "../../models/auth";

export default function VerifyEmail() {
  const contact = "contact@facio.com";
  const name = useAppSelector(selectUser)?.name;
  const isLoading = useAppSelector(
    (state) => state.auth.sendVerificationEmailStatus === "loading"
  );
  const dispatch = useAppDispatch();

  const onClick = useCallback(() => {
    dispatch(sendVerificationEmail());
  }, []);

  return (
    <div style={{ marginTop: "3vh" }} className={styles.container}>
      <img className={styles.welcome} src={art} alt="welcome" />
      <Logo style={{ marginTop: "-0.5rem", marginBottom: "-1rem" }} />
      <p className={styles.note}>
        {`Hi ${name}! Please click on the button below to verify your email and start using FACIO.`}
      </p>
      <Button
        onClick={onClick}
        loading={isLoading}
        title="verify email"
        size="large"
      />
      <p className={styles.contact}>
        Questions? Email us at <a href={`mailto:${contact}`}>{contact}</a>
      </p>
    </div>
  );
}
