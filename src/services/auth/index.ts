import axios from "axios";

export interface creds {
  email: string;
  password: string;
}

async function login(arg: creds) {
  const { data } = await axios.post("/auth/login", arg);
  return data;
}

async function signup(arg: creds & { name: string }) {
  const { data } = await axios.post("/auth/register", arg);
  return data;
}

async function send_verification_email() {
  const { data } = await axios.post("/auth/send-verification-email");
  return data;
}

async function verify_email({ token }: { token: string }) {
  const { data } = await axios.post("/auth/verify-email", null, {
    params: { token },
  });
  return data;
}

async function refresh_token({ refreshToken }: { refreshToken: string }) {
  const { data } = await axios.post("/auth/refresh-tokens", { refreshToken });
  return data;
}

async function forgot_password({ email }: { email: string }) {
  const { data } = await axios.post("/auth/forgot-password", { email });
  return data;
}

async function reset_password({
  token,
  password,
}: {
  token: string;
  password: string;
}) {
  const { data } = await axios.post(
    "/auth/reset-password",
    { password },
    { params: { token } }
  );
  return data;
}

async function logout({ refreshToken }: { refreshToken: string }) {
  const { data } = await axios.post("/auth/logout", { refreshToken });
  return data;
}

const Auth = {
  login,
  signup,
  send_verification_email,
  verify_email,
  refresh_token,
  forgot_password,
  reset_password,
  logout,
};

export default Auth;
