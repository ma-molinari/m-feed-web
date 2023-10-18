"use client";

import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreateIcon, ExploreIcon, HomeIcon, ProfileIcon } from "./icons";
import { SearchIcon } from "lucide-react";

interface Props {
  href: string;
  icon: "home" | "explore" | "search" | "create" | "profile";
}

const CURRENT_ICON = {
  home: <HomeIcon />,
  explore: <ExploreIcon />,
  search: <SearchIcon />,
  create: <CreateIcon />,
  profile: <ProfileIcon />,
};

const SidebarItem = ({ href, icon }: Props) => {
  const pathname = usePathname();
  const isActive = Boolean(pathname === href);

  const activeStyleContainer = isActive
    ? "border-primary"
    : "hover:border-primary";

  return (
    <Link
      href={href}
      className={`w-[44px] h-[44px] flex items-center justify-center ${activeStyleContainer} transition-colors dark:border border-2 rounded-lg [&>svg]:stroke-card-foreground`}
    >
      {CURRENT_ICON[icon]}
    </Link>
  );
};

export default memo(SidebarItem);
