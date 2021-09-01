import React, { useCallback } from "react";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import { GoMail } from "react-icons/go";
import { GoLock } from "react-icons/go";
import styles from "./index.module.scss";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { login } from "../../models/auth";

export default function Login() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state) => state.auth.loginStatus === "loading"
  );

  const onSubmit = useCallback((e: any) => {
    e.preventDefault();
    const elems = e.target.elements;
    dispatch(
      login({
        email: elems.email.value,
        password: elems.password.value,
        remember: elems.remember.checked,
      })
    );
  }, []);

  return (
    <>
      <Logo />
      <form onSubmit={onSubmit}>
        <Input
          leftIcon={<GoMail />}
          inputProps={{
            name: "email",
            type: "email",
            placeholder: "email",
            required: true,
          }}
        />
        <Input
          leftIcon={<GoLock />}
          inputProps={{
            name: "password",
            type: "password",
            placeholder: "password",
            minLength: 8,
            required: true,
          }}
        />
        <div className={styles.remember}>
          <Checkbox
            defaultChecked={false}
            name="remember"
            label="Remember me"
          />
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <Button
          loading={isLoading}
          htmlType="submit"
          title="Login"
          size="large"
        />
      </form>
      <p className={styles.no_account}>
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
    </>
  );
}
