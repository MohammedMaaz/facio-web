import React, { useCallback } from "react";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import { GoMail, GoPerson } from "react-icons/go";
import { GoLock } from "react-icons/go";
import styles from "./index.module.scss";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { signup } from "../../models/auth";
import Checkbox from "../../components/Checkbox";

export default function Signup() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state) => state.auth.signupStatus === "loading"
  );

  const onSubmit = useCallback((e: any) => {
    e.preventDefault();
    const elems = e.target.elements;
    if (elems.password2.value !== elems.password.value) {
      elems.password2.setCustomValidity("Passwords do not match!");
    }

    if (e.target.reportValidity()) {
      dispatch(
        signup({
          name: elems.name.value,
          email: elems.email.value,
          password: elems.password.value,
          remember: elems.remember.checked,
        })
      );
    }
  }, []);

  const onFormChange = useCallback((e) => {
    const elems = e.currentTarget.elements;
    if (elems.password2.value === elems.password.value)
      elems.password2.setCustomValidity("");
  }, []);

  return (
    <>
      <Logo />
      <form onChange={onFormChange} onSubmit={onSubmit}>
        <Input
          leftIcon={<GoPerson />}
          inputProps={{
            name: "name",
            placeholder: "full name",
            required: true,
            minLength: 3,
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
            minLength: 8,
            required: true,
          }}
        />
        <Input
          leftIcon={<GoLock />}
          inputProps={{
            name: "password2",
            type: "password",
            placeholder: "retype password",
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
        </div>
        <Button
          loading={isLoading}
          htmlType="submit"
          title="Signup"
          size="large"
        />
      </form>
      <p className={styles.no_account}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </>
  );
}
