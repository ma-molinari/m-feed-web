import SidebarItem from "./SidebarItem";
import SidebarLogout from "./SidebarLogout";

const Sidebar = () => {
  return (
    <aside className="w-full">
      <div className="max-w-[80px] fixed h-screen border-r border-neutral-800 border-solid py-8 px-4 flex flex-col justify-between">
        <div />

        <nav className="flex flex-col items-center justify-center space-y-6">
          <SidebarItem href="/" icon="home" />
          <SidebarItem href="/explore" icon="explore" />
          <SidebarItem href="/search" icon="search" />
          <SidebarItem href="/create" icon="create" />
          <SidebarItem href="/profile" icon="profile" />
        </nav>

        <SidebarLogout />
      </div>
    </aside>
  );
};

export default Sidebar;
