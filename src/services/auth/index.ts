import axios from "axios";
import { API_BASE_URL } from "../../config/api";

//set default config
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

interface creds {
  email: string;
  password: string;
}

async function login({ email, password }: creds) {
  const { data } = await axios.post("/login", { email, password });
  return data;
}

async function signup({ email, password }: creds) {
  const { data } = await axios.post("/register", { email, password });
  return data;
}

async function verify_email() {}

async function refresh_token() {
  const { data } = await axios.post("/refresh-tokens");
  return data;
}

async function logout() {}

const Auth = {
  login,
  signup,
  verify_email,
  refresh_token,
  logout,
};

export default Auth;
