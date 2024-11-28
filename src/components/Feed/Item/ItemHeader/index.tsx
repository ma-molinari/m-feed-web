import { memo } from "react";
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
import HoverUser from "@global-components/HoverUser";
import { formatDistanceStrict } from "date-fns";

const ItemHeader = ({ data }: ItemProps) => {
  const { data: me } = useCurrentUser();
  const userOwner = me?.id === data?.userId ? me : data?.user;

  const formattedDate = formatDistanceStrict(
    new Date(data.createdAt),
    new Date()
  );

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <HoverUser data={userOwner}>
        <div className="flex items-center space-x-2 cursor-pointer">
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
          <p className="text-sm font-semibold line-clamp-1 text-card-foreground hover:underline">
            @{userOwner?.username}
          </p>
          <span className="text-muted-foreground">·</span>
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
        </div>
      </HoverUser>
      <ItemMenu data={data}>
        <MoreHorizontal strokeWidth={1.5} />
      </ItemMenu>
    </div>
  );
};

export default memo(ItemHeader);
