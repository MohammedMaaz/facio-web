import axios from "axios";
import { delay } from ".";
import { logout, LSKeys, startBgRefreshLoop } from "../models/auth";

export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/v1"
    : "https://floating-savannah-40666.herokuapp.com/v1";
export const API_MAX_RETRIES = 3;
export const API_RETRY_EXP_BASE = 1.5;
export const API_UNAUTHORIZED_STATUS = 401;

export const getAccessToken = () => {
  const { store } = require("../store");
  return store.getState().auth.accessToken.token;
};

export const getRefreshToken = () => {
  let token = localStorage.getItem(LSKeys.refreshToken);
  if (!token) {
    const { store } = require("../store");
    token = store.getState().auth.refreshToken.token;
  }

  return token || null;
};

export function initAxiosConfig() {
  const { store } = require("../store");

  //set default configs
  axios.defaults.baseURL = API_BASE_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  //request interceptor to attach Auth Bearer token
  axios.interceptors.request.use((config) => {
    const token =
      getAccessToken() || axios.defaults.headers.Authorization?.slice(7) || "";
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  //response intercpetor to retry failed requests and retry token fetch on API_UNAUTHORIZED_STATUS
  axios.interceptors.response.use(undefined, async (error) => {
    const config = error.config;

    //retry incase the response is API_UNAUTHORIZED_STATUS
    if (error.response?.status === API_UNAUTHORIZED_STATUS) {
      //if already attempted retry once then logout
      if (config.__retries) {
        await store.dispatch(logout());
        throw error?.response?.data || error;
      } else {
        //if first time got a API_UNAUTHORIZED_STATUS then attempt to refreh token foecefully and retry
        config.__retries = true;
        console.error(
          `${API_UNAUTHORIZED_STATUS} - Retrying to refresh token...`
        );

        //should not retry if refresh token request
        if (!config.url.endsWith("/auth/refresh-tokens")) {
          await store.dispatch(startBgRefreshLoop(true));
          return axios(config);
        }
      }
    }

    //generic retry for all other errors
    else if (
      !Number.isInteger(config.__retries) ||
      config.__retries <= API_MAX_RETRIES
    ) {
      if (!config.__retries) config.__retries = 1;
      await delay(API_RETRY_EXP_BASE ** config.__retries * 1000);
      console.error(
        `${
          error.response?.status || "Network Error"
        } - Retrying request attempt ${config.__retries}...`
      );
      config.__retries++;
      return axios(config);
    }

    //if not handled by any of the above if blocks then propagate the error fwd
    throw error?.response?.data || error;
  });
}
