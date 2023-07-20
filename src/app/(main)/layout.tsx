import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="grid grid-cols-2">
      <aside>sidebar</aside>
      <div>{children}</div>
    </section>
  );
};

export default MainLayout;
