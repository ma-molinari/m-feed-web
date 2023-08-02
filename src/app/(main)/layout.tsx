import { ReactNode, Suspense } from "react";

import Sidebar from "@global-components/Sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex bg-primary">
      <Sidebar />
      <div className="w-full ml-[134px] min-h-[2000px]">
        <Suspense fallback={<p>loading...</p>}>{children}</Suspense>
      </div>
    </section>
  );
};

export default MainLayout;
