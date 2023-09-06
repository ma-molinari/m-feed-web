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
    ? "border-primary"
    : "hover:border-primary";

  return (
    <Link
      href={href}
      className={`w-[44px] h-[44px] flex items-center justify-center ${activeStyleContainer} transition-colors border rounded-lg text-card-foreground`}
    >
      <p>H</p>
      {/* <Image
        src={`/assets/sidebar/${icon}-${iconType}.svg`}
        alt={`${icon} icon`}
        width={26}
        height={26}
      /> */}
    </Link>
  );
};

export default memo(SidebarItem);
