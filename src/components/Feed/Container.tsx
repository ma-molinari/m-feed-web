import { ComponentProps } from "./types";

const Container = ({ children }: ComponentProps) => {
  return (
    <div className="grid w-3/4 grid-cols-3 gap-6 mx-auto overflow-auto">
      {children}
    </div>
  );
};

export default Container;
