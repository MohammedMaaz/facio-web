import React, { useState, useCallback } from "react";
import Avatar from "react-avatar";
import { GoLock, GoMail, GoPerson } from "react-icons/go";
import AlertPopup from "../../components/AlertPopup";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Spin from "../../components/Spin";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { selectUser, updateProfile } from "../../models/user";
import styles from "./index.module.scss";

export default function Profile() {
  const user = useAppSelector(selectUser);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const onChange = useCallback((e) => {
    const setters: any = {
      name: setName,
      email: setEmail,
      password: setPassword,
    };
    setters[e.target.name]?.(e.target.value);

    const elems = e.currentTarget.elements;
    if (elems.password2.value === elems.password.value)
      elems.password2.setCustomValidity("");
  }, []);

  const hasChanged =
    name !== user?.name || email !== user?.email || password !== "";

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const elems = e.target.elements;
    if (elems.password2.value !== elems.password.value) {
      elems.password2.setCustomValidity("Passwords do not match!");
    }

    if (e.target.reportValidity()) {
      AlertPopup({
        title: "Update Profile",
        message:
          "Your changes will be applied to your profile. Do you want to continue?",
        onOk: () =>
          dispatch(
            updateProfile({
              name: elems.name.value,
              email: elems.email.value,
              password: elems.password.value,
            })
          )
            .unwrap()
            .then(() => {
              setPassword("");
              e.target.reset();
            }),
      });
    }
  }, []);

  return (
    <form onSubmit={onSubmit} onChange={onChange} className={styles.container}>
      {user ? (
        <>
          <Avatar
            style={{ marginBottom: "2rem" }}
            size="6rem"
            round
            name={user.name}
          />
          <Input
            leftIcon={<GoPerson />}
            inputProps={{
              name: "name",
              placeholder: "full name",
              required: true,
              minLength: 3,
              value: name,
            }}
          />
          <Input
            leftIcon={<GoMail />}
            inputProps={{
              name: "email",
              type: "email",
              placeholder: "email",
              required: true,
              value: email,
            }}
          />
          <Input
            leftIcon={<GoLock />}
            inputProps={{
              name: "password",
              type: "password",
              placeholder: "new password (optional)",
              minLength: 8,
              value: password,
            }}
          />
          <Input
            containerStyle={{
              marginTop: password.length ? 0 : "-3.3rem",
              opacity: password.length ? 1 : 0,
              transition: "0.5s",
              zIndex: password.length ? undefined : -1,
            }}
            leftIcon={<GoLock />}
            inputProps={{
              defaultValue: "",
              name: "password2",
              type: "password",
              placeholder: "retype new password",
              minLength: 8,
              required: password.length > 0,
            }}
          />
          <Button
            style={{
              marginTop: "2rem",
            }}
            htmlType="submit"
            title="Update"
            disabled={!hasChanged}
            size="medium"
          />
        </>
      ) : (
        <Spin size="large" />
      )}
    </form>
  );
}
