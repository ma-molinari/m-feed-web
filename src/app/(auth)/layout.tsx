import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <section className="w-full h-screen p-4 bg-white">{children}</section>;
};

export default AuthLayout;
