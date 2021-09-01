import React, { useEffect } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { useAppDispatch } from "../../hooks/redux";
import { useQuery } from "../../hooks/useQuery";
import { verifyEmail } from "../../models/auth";

export default function OnEmailVerification() {
  const query = useQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyEmail({ token: query.get("token") || "" }));
  }, []);

  return <LoadingScreen />;
}
