import React, { ReactNode } from "react";
import { useEffect } from "react";
import {
  Route as RouterRoute,
  RouteProps as RouterRouteProps,
  Redirect,
  useLocation,
} from "react-router-dom";
import { useAuthState } from "../../hooks/auth";
import { useAppDispatch } from "../../hooks/redux";
import { useIsEmailVerified } from "../../hooks/user";
import { startBgRefreshLoop } from "../../models/auth";
import AuthLayout from "../layouts/AuthLayout";
import EmptyLayout from "../layouts/EmptyLayout";
import LoadingScreen from "../LoadingScreen";

function LayoutWrapper({
  type,
  children,
}: {
  type?: string;
  children: ReactNode;
}) {
  switch (type) {
    case "empty":
      return <EmptyLayout>{children}</EmptyLayout>;
    case "auth":
      return <AuthLayout>{children}</AuthLayout>;
    case "none":
    default:
      return <>{children}</>;
  }
}

function AuthWrapper({
  type,
  children,
}: {
  type?: RouteProps["authType"];
  children: ReactNode;
}) {
  const location = useLocation();
  const authState = useAuthState();
  const isEmailVerified = useIsEmailVerified();
  const dispatch = useAppDispatch();
  const from: typeof location = (
    location.state as undefined | { [key: string]: any }
  )?.from;

  useEffect(() => {
    if (authState === "undecisive" || authState === "loggedIn")
      dispatch(startBgRefreshLoop());
  }, [authState]);

  switch (type) {
    case "authenticated":
      if (authState === "undecisive") return <LoadingScreen />;
      else if (authState === "loggedOut")
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      else if (!isEmailVerified)
        return <Redirect to={{ pathname: "/verify-email" }} />;
      else if (from?.pathname?.length) return <Redirect to={from.pathname} />;
      return <>{children}</>;

    case "unauthenticated":
      if (authState === "undecisive") return <LoadingScreen />;
      else if (authState === "loggedIn")
        return <Redirect to={{ pathname: "/", state: { from } }} />;
      return <>{children}</>;

    case "unverified":
      if (authState === "undecisive") return <LoadingScreen />;
      else if (authState === "loggedOut")
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      else if (isEmailVerified) return <Redirect to="/" />;
      return <>{children}</>;

    case "none":
    default:
      return <>{children}</>;
  }
}

interface RouteProps extends RouterRouteProps {
  authType?: "none" | "authenticated" | "unauthenticated" | "unverified";
  layoutType?: string;
}

const Route = ({
  authType = "none",
  layoutType = "empty",
  children,
  ...props
}: RouteProps) => {
  return (
    <RouterRoute {...props}>
      <AuthWrapper type={authType}>
        <LayoutWrapper type={layoutType}>{children}</LayoutWrapper>
      </AuthWrapper>
    </RouterRoute>
  );
};

export default Route;
