"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  icon: string;
}

const SidebarItem = ({ href, icon }: Props) => {
  const pathname = usePathname();
  const isActive = Boolean(pathname === href);

  const iconType = isActive ? "active" : "outline";
  const activeStyleContainer = isActive ? "bg-neutral-100" : "hover:bg-primary";

  return (
    <Link
      href={href}
      className={`w-full h-[54px] rounded-full flex items-center justify-center ${activeStyleContainer} transition-colors`}
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

export default SidebarItem;
