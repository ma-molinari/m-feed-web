import { ReactNode } from "react";

import Sidebar from "@global-components/Sidebar";
import PostDetails from "@global-components/PostDetails";
import PostManager from "@global-components/PostManager";
import NotificationSSE from "@global-components/NotificationSEE";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="w-full">{children}</div>
      <PostManager />
      <PostDetails />
      <NotificationSSE />
    </section>
  );
};

export default MainLayout;
