import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Route from "./Route";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" authType="only-unauthenticated" layoutType="auth">
          <Login />
        </Route>
        <Route path="/signup" authType="only-unauthenticated" layoutType="auth">
          <Signup />
        </Route>
        <Route
          path="/verify-email"
          authType="only-unauthenticated"
          layoutType="auth"
        >
          Verify Email
        </Route>
        <Route path="/profile" authType="only-authenticated" layoutType="empty">
          Profile
        </Route>
        <Route path="/" authType="only-authenticated" layoutType="empty">
          Home
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
