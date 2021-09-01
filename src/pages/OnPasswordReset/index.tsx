import React, { useCallback, useEffect } from "react";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import { GoLock } from "react-icons/go";
import Button from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { resetPassword } from "../../models/auth";
import { useQuery } from "../../hooks/useQuery";
import { history } from "../../utils";

export default function OnPasswordReset() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state) => state.auth.resetPasswordStatus === "loading"
  );

  const token = useQuery().get("token") || "";

  useEffect(() => {
    if (!token) history.push("/");
  }, [token]);

  const onSubmit = useCallback((e: any) => {
    e.preventDefault();
    const elems = e.target.elements;
    if (elems.password2.value !== elems.password.value) {
      elems.password2.setCustomValidity("Passwords do not match!");
    }

    if (e.target.reportValidity()) {
      dispatch(resetPassword({ token, password: elems.password.value }));
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
          leftIcon={<GoLock />}
          inputProps={{
            name: "password",
            type: "password",
            placeholder: "new password",
            minLength: 8,
            required: true,
          }}
        />
        <Input
          leftIcon={<GoLock />}
          inputProps={{
            name: "password2",
            type: "password",
            placeholder: "retype new password",
            minLength: 8,
            required: true,
          }}
        />
        <Button
          style={{ marginTop: "2rem" }}
          loading={isLoading}
          htmlType="submit"
          title="Reset Password"
          size="large"
        />
      </form>
    </>
  );
}
