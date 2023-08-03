import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="grid w-3/4 grid-cols-3 gap-6 mx-auto">{children}</div>;
};

export default Container;
