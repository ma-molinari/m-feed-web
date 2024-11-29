import { memo } from "react";
import { MoreHorizontal } from "lucide-react";

import { ItemProps } from "@global-components/Feed/types";
import ItemMenu from "../ItemMenu";
import { useCurrentUser } from "@services/users";
import HoverUser from "@global-components/HoverUser";
import UserCardInline from "@global-components/ui/user-card-inline";

const ItemHeader = ({ data }: ItemProps) => {
  const { data: me } = useCurrentUser();
  const userOwner = me?.id === data?.userId ? me : data?.user;

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <HoverUser data={userOwner}>
        <div>
          <UserCardInline data={userOwner} createdAt={data?.createdAt} />
        </div>
      </HoverUser>
      <ItemMenu data={data}>
        <MoreHorizontal strokeWidth={1.5} />
      </ItemMenu>
    </div>
  );
};

export default memo(ItemHeader);
