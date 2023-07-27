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
  const iconType = pathname === href ? "filled" : "outline";

  return (
    <Link href={href}>
      <Image
        src={`/assets/sidebar/${icon}-${iconType}.svg`}
        alt={`${icon} icon`}
        width={28}
        height={28}
      />
    </Link>
  );
};

export default SidebarItem;
