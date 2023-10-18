import { Metadata } from "next";

import LoginScreen from "@modules/auth/screens/Login";

export const metadata: Metadata = {
  title: "Login - M-Feed",
  description: "Enter your credentials to access your account.",
};

const Login = () => {
  return <LoginScreen />;
};

export default Login;
