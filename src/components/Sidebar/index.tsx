import FindUser from "@global-components/FindUser";
import SidebarItem from "./SidebarItem";
import SidebarLogout from "./SidebarLogout";
import SidebarCreate from "./SidebarCreate";

const Sidebar = () => {
  return (
    <aside className="flex flex-col items-center justify-between py-8 mx-6">
      <div />

      <nav className="flex flex-col items-center justify-center px-3 py-4 space-y-6 rounded-lg">
        <SidebarItem href="/" icon="home" />
        <FindUser>
          <SidebarItem type="button" icon="search" />
        </FindUser>
        <SidebarCreate />
        <SidebarItem href="/profile" icon="profile" />
      </nav>

      <SidebarLogout />
    </aside>
  );
};

export default Sidebar;
