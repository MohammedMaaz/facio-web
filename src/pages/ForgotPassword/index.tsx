import React, { useCallback } from "react";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import { GoMail } from "react-icons/go";
import styles from "../VerifyEmail/index.module.scss";
import Button from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { forgotPassword } from "../../models/auth";

export default function ForgotPassword() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state) => state.auth.forgotPasswordStatus === "loading"
  );

  const onSubmit = useCallback((e: any) => {
    e.preventDefault();
    dispatch(forgotPassword({ email: e.target.elements.email.value }));
  }, []);

  return (
    <div className={styles.container}>
      <Logo />
      <form onSubmit={onSubmit}>
        <p style={{ marginBottom: "1.5rem" }}>
          Enter your email below and we will send you a recovery link to reset
          your password.
        </p>
        <Input
          leftIcon={<GoMail />}
          inputProps={{
            name: "email",
            type: "email",
            placeholder: "email",
            required: true,
          }}
        />
        <Button
          style={{ marginTop: "2rem" }}
          loading={isLoading}
          htmlType="submit"
          title="Send Email"
          size="large"
        />
      </form>
    </div>
  );
}
