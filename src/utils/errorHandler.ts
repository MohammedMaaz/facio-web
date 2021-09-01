import { isRejectedWithValue, Middleware, isRejected } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const errorHandlerMiddleware: Middleware = () => (next) => (action) => {
  let error: { message?: string; [key: string]: any } | null = null;

  if (isRejected(action)) {
    error = { ...action.error, message: action.error.message };
  } else if (isRejectedWithValue(action)) {
    error = { payload: action.payload, message: action.payload?.message };
  }

  if (error) globalErrorHandler(error);

  return next(action);
};

export const globalErrorHandler = (error: { [key: string]: any } | string) => {
  if (typeof error === "string") error = { message: error };

  error.message = error.message || "An unknown error occurred!";
  console.error(error.message, error);
  toast.error(error.message);
};
