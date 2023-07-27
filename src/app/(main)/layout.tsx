import { ReactNode, Suspense } from "react";

import Sidebar from "@global-components/Sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="grid grid-cols-layout">
      <Sidebar />
      <Suspense fallback={<p>loading...</p>}>
        <div className="min-h-[2000px]">{children}</div>
      </Suspense>
    </section>
  );
};

export default MainLayout;
