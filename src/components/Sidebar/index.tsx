import SidebarItem from "./SidebarItem";
import SidebarLogout from "./SidebarLogout";

const Sidebar = () => {
  return (
    <aside className="w-[60px] fixed flex flex-col justify-between items-center h-screen mx-6 py-8">
      <div />

      <nav className="flex flex-col items-center justify-center w-full px-2 py-4 space-y-6 rounded-full bg-neutral-900">
        <SidebarItem href="/" icon="home" />
        <SidebarItem href="/explore" icon="explore" />
        <SidebarItem href="/search" icon="search" />
        <SidebarItem href="/create" icon="create" />
        <SidebarItem href="/profile" icon="profile" />
      </nav>

      <SidebarLogout />
    </aside>
  );
};

export default Sidebar;
