"use client";

import { memo } from "react";
import { Search, Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href?: string;
  icon: "home" | "search" | "profile";
  type?: "link" | "button";
}

const CURRENT_ICON = {
  home: <Home strokeWidth={1.5} />,
  search: <Search strokeWidth={1.5} />,
  profile: <User strokeWidth={1.5} />,
};

const SidebarItem = ({ href = `#`, icon, type = `link` }: Props) => {
  const pathname = usePathname();
  const isActive = Boolean(pathname === href);

  const activeStyleContainer = isActive
    ? `border-primary`
    : `hover:border-primary`;

  if (type === `link`) {
    return (
      <Link
        href={href}
        className={`w-[44px] h-[44px] flex items-center justify-center ${activeStyleContainer} transition-colors dark:border border-2 rounded-lg [&>svg]:stroke-card-foreground`}
      >
        {CURRENT_ICON[icon]}
      </Link>
    );
  }

  return (
    <button
      className={`w-[44px] h-[44px] flex items-center justify-center ${activeStyleContainer} transition-colors dark:border border-2 rounded-lg [&>svg]:stroke-card-foreground`}
    >
      {CURRENT_ICON[icon]}
    </button>
  );
};

export default memo(SidebarItem);
