import { ReactNode, Suspense } from "react";

import Sidebar from "@global-components/Sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <Suspense fallback={<p>loading...</p>}>
        <div className="w-full">{children}</div>
      </Suspense>
    </section>
  );
};

export default MainLayout;
