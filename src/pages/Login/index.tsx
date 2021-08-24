import React, { useState } from "react";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import { GoMail } from "react-icons/go";
import { GoLock } from "react-icons/go";
import styles from "./index.module.scss";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <Logo style={{ marginBottom: `1rem` }} />
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          console.log("email:", e.target.elements["email"].value);
          console.log("password:", e.target.elements["password"].value);
          console.log("remember:", e.target.elements["remember"].checked);
        }}
      >
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
            minLength: 6,
            required: true,
          }}
        />
        <div className={styles.remember}>
          <Checkbox
            defaultChecked={false}
            name="remember"
            label="Remember me"
            onChange={console.log}
          />
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <Button htmlType="submit" title="Login" size="large" />
      </form>
      <div className={styles.no_account}>
        Don't have an account? <Link to="/signup">Signup here</Link>
      </div>
    </>
  );
}
