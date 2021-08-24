import React, { useState } from "react";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import { GoMail, GoPerson } from "react-icons/go";
import { GoLock } from "react-icons/go";
import styles from "./index.module.scss";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <>
      <Logo style={{ marginBottom: `1rem` }} />
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          console.log("name:", e.target.elements["name"].value);
          console.log("email:", e.target.elements["email"].value);
          console.log("password:", e.target.elements["password"].value);
          console.log("password2:", e.target.elements["password2"].value);
        }}
      >
        <Input
          leftIcon={<GoPerson />}
          inputProps={{
            name: "name",
            placeholder: "full name",
            required: true,
          }}
        />
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
        <Input
          leftIcon={<GoLock />}
          inputProps={{
            name: "password2",
            type: "password",
            placeholder: "retype password",
            minLength: 6,
            required: true,
          }}
        />
        <Button
          style={{ marginTop: "2.4rem" }}
          htmlType="submit"
          title="Signup"
          size="large"
        />
      </form>
      <div className={styles.no_account}>
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </>
  );
}
