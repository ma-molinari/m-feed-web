import { ReactNode } from "react";

import Sidebar from "@global-components/Sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="grid grid-cols-layout">
      <Sidebar />
      <div className="min-h-[2000px]">{children}</div>
    </section>
  );
};

export default MainLayout;
