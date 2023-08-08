import { ReactNode, Suspense } from "react";

import Sidebar from "@global-components/Sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex bg-neutral-950">
      <div className="w-[108px]">
        <Sidebar />
      </div>
      <Suspense fallback={<p>loading...</p>}>
        <div className="w-full overflow-y-hidden">{children}</div>
      </Suspense>
    </section>
  );
};

export default MainLayout;
