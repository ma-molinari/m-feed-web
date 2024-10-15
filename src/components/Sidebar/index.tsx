import FindUser from "@global-components/FindUser";
import PostManager from "@global-components/PostManager";
import SidebarItem from "./SidebarItem";
import SidebarLogout from "./SidebarLogout";

const Sidebar = () => {
  return (
    <aside className="flex flex-col items-center justify-between py-8 mx-6">
      <div />

      <nav className="flex flex-col items-center justify-center px-3 py-4 space-y-6 rounded-lg">
        <SidebarItem href="/" icon="home" />
        <FindUser>
          <SidebarItem type="button" icon="search" />
        </FindUser>
        <PostManager>
          <SidebarItem type="button" icon="create" />
        </PostManager>
        <SidebarItem href="/settings" icon="settings" />
      </nav>

      <SidebarLogout />
    </aside>
  );
};

export default Sidebar;
