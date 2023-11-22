import Link from "next/link";
import { useCallback, useState } from "react";
import { MoreHorizontal } from "lucide-react";

import { IMAGE_URL } from "@configs/environment";
import { ItemProps } from "@global-components/Feed/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@global-components/ui/avatar";
import { Button } from "@global-components/ui/button";

import ItemMenu from "../ItemMenu";

const ItemHeader = ({ data }: ItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center space-x-2">
        <Link href={`/user/${data?.user?.username}`}>
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={`${IMAGE_URL}/${data?.user?.avatar}`}
              alt={data?.user?.username}
              height={32}
              width={32}
            />
            {/* Refactor soon, return the initials of the full name. */}
            <AvatarFallback>{data?.user?.fullName[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <Link
          href={`/user/${data?.user?.username}`}
          className="text-sm font-semibold line-clamp-1 text-card-foreground"
        >
          {data?.user?.username}
        </Link>
      </div>

      <Button className="p-0" variant="link" onClick={onOpen}>
        <MoreHorizontal />
      </Button>

      <ItemMenu isOpen={isOpen} onClose={onClose} data={data} />
    </div>
  );
};

export default ItemHeader;
