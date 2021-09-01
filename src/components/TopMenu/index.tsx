import React, { useCallback } from "react";
import Avatar from "react-avatar";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { selectUser } from "../../models/user";
import { useIsEmailVerified } from "../../hooks/user";
import ThemeSwitch from "../ThemeSwitch";
import styles from "./index.module.scss";
import { useAuthState } from "../../hooks/auth";
import { useTheme } from "../../hooks/useTheme";
import { history, opacity } from "../../utils";
import { logout } from "../../models/auth";
import AlertPopup from "../AlertPopup";
import Logo from "../Logo";

export default function TopMenu({ logo = true }: { logo?: boolean }) {
  const name = useAppSelector(selectUser)?.name;
  const authState = useAuthState();
  const isEmailVerified = useIsEmailVerified();
  const { theme, name: themeName } = useTheme();
  const dispatch = useAppDispatch();
  const logoutLoading = useAppSelector(
    (state) => state.auth.logoutStatus === "loading"
  );

  const onLogout = useCallback(() => {
    AlertPopup({
      title: "Logout",
      message: "Are you sure you want to logout?",
      onOk: () => dispatch(logout(true)),
    });
  }, []);

  const onProfile = useCallback(() => {
    history.push("/profile");
  }, []);

  if (authState === "undecisive") return null;

  const menuItemStyles = {
    hover: { backgroundColor: opacity(theme.font_color, 0.1) },
    active: { backgroundColor: theme.primary_color },
  };

  return (
    <div
      style={
        !logo
          ? {
              position: "absolute",
              top: "1rem",
              right: "1.5rem",
              marginTop: 0,
            }
          : undefined
      }
      className={styles.container}
    >
      <div>{logo && <Logo isSmall={true} />}</div>
      <div>
        <ThemeSwitch />
        {name && (
          <Menu
            menuStyles={{
              fontSize: theme.font_medium,
              borderRadius: theme.border_radius,
              color: theme.font_color,
              backgroundColor: theme.bg_color,
              boxShadow:
                themeName === "dark"
                  ? `0 3px 7px #000, 0 0.6px 2px #000`
                  : undefined,
              border: `0.2px solid #ffffff1d`,
            }}
            menuButton={
              <MenuButton
                styles={{
                  backgroundColor: "transparent",
                  border: "none",
                  marginLeft: "1rem",
                }}
              >
                <Avatar
                  style={{ cursor: "pointer" }}
                  size="1.8rem"
                  round
                  name={name}
                />
              </MenuButton>
            }
            transition
          >
            <MenuItem
              onClick={onProfile}
              styles={menuItemStyles}
              disabled={!isEmailVerified}
            >
              Profile
            </MenuItem>
            <MenuItem
              disabled={logoutLoading}
              onClick={onLogout}
              styles={menuItemStyles}
            >
              Logout
            </MenuItem>
          </Menu>
        )}
      </div>
    </div>
  );
}
