import { ReactNode, Suspense } from "react";

import Sidebar from "@global-components/Sidebar";
import PostDetails from "@global-components/PostDetails";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="w-full">{children}</div>
      {/* PostManager */}
      <PostDetails />
      {/* PostMenu */}
    </section>
  );
};

export default MainLayout;
