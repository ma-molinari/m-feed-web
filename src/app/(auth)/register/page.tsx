import Link from "next/link";

import RegisterScreen from "@modules/auth/screens/Register";

export const metadata = {
  title: "Register - M-Feed",
  description: "Let's get create an account",
};

const Register = () => {
  return <RegisterScreen />;
};

export default Register;
