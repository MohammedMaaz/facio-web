import React, { ReactNode } from "react";
import {
  Route as RouterRoute,
  RouteProps as RouterRouteProps,
  Redirect,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import AuthLayout from "../layouts/AuthLayout";
import EmptyLayout from "../layouts/EmptyLayout";

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
  type?: string;
  children: ReactNode;
}) {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  switch (type) {
    case "only-authenticated":
      if (isLoggedIn === undefined) return <h1>Loading</h1>;
      else if (!isLoggedIn)
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      return <>{children}</>;
    case "only-unauthenticated":
      if (isLoggedIn === undefined) return <h1>Loading</h1>;
      else if (isLoggedIn)
        return (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        );
      return <>{children}</>;
    case "none":
    default:
      return <>{children}</>;
  }
}

interface RouteProps extends RouterRouteProps {
  authType?: string;
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
