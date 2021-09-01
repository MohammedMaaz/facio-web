import React from "react";
import { Router as BrowserRouter, Switch } from "react-router-dom";
import ForgotPassword from "../../pages/ForgotPassword";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import OnEmailVerification from "../../pages/OnEmailVerification";
import OnPasswordReset from "../../pages/OnPasswordReset";
import Profile from "../../pages/Profile";
import Signup from "../../pages/Signup";
import VerifyEmail from "../../pages/VerifyEmail";
import { history } from "../../utils";
import Route from "./Route";

export default function Router() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/login" authType="unauthenticated" layoutType="auth">
          <Login />
        </Route>
        <Route path="/signup" authType="unauthenticated" layoutType="auth">
          <Signup />
        </Route>
        <Route
          path="/forgot-password"
          authType="unauthenticated"
          layoutType="auth"
        >
          <ForgotPassword />
        </Route>
        <Route path="/verify-email" authType="unverified" layoutType="auth">
          <VerifyEmail />
        </Route>
        <Route path="/on-email-verification" authType="none" layoutType="auth">
          <OnEmailVerification />
        </Route>
        <Route path="/on-password-reset" authType="none" layoutType="auth">
          <OnPasswordReset />
        </Route>
        <Route path="/profile" authType="authenticated" layoutType="empty">
          <Profile />
        </Route>
        <Route path="/" authType="authenticated" layoutType="empty">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
