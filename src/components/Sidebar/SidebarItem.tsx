"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

interface Props {
  href: string;
  icon: string;
}

const SidebarItem = ({ href, icon }: Props) => {
  const pathname = usePathname();
  const isActive = Boolean(pathname === href);

  const iconType = isActive ? "active" : "outline";
  const activeStyleContainer = isActive
    ? "bg-neutral-100"
    : "hover:bg-neutral-950";

  return (
    <Link
      href={href}
      className={`w-full h-[44px] rounded-full flex items-center justify-center ${activeStyleContainer} transition-colors`}
    >
      <Image
        src={`/assets/sidebar/${icon}-${iconType}.svg`}
        alt={`${icon} icon`}
        width={26}
        height={26}
      />
    </Link>
  );
};

export default memo(SidebarItem);
