import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import { IMAGE_URL } from "@configs/environment";
import { ItemProps } from "@global-components/Feed/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@global-components/ui/avatar";
import ItemMenu from "../ItemMenu";
import { useCurrentUser } from "@services/users";

const ItemHeader = ({ data }: ItemProps) => {
  const { data: me } = useCurrentUser();
  const userOwner = me?.id === data?.userId ? me : data?.user;

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center space-x-2">
        <Link href={`/profile/${userOwner?.id}/${userOwner?.username}`}>
          <Avatar className="w-9 h-9">
            <AvatarImage
              src={userOwner?.avatar && `${IMAGE_URL}/${userOwner?.avatar}`}
              alt={userOwner?.username}
              height={36}
              width={36}
            />
            {/* Refactor soon, return the initials of the full name */}
            <AvatarFallback>{userOwner?.fullName?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        <Link
          href={`/profile/${userOwner?.id}/${userOwner?.username}`}
          className="text-sm font-semibold line-clamp-1 text-card-foreground"
        >
          {userOwner?.username}
        </Link>
      </div>

      <ItemMenu data={data}>
        <MoreHorizontal strokeWidth={1.5} />
      </ItemMenu>
    </div>
  );
};

export default ItemHeader;
