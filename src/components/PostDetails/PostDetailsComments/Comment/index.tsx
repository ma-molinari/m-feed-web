import { memo } from "react";
import { formatDistanceStrict } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { IMAGE_URL } from "@configs/environment";
import { Comment as IComment } from "@entities/comment";
import { useCurrentUser } from "@services/users";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@global-components/ui/avatar";
import HoverUser from "@global-components/HoverUser";
import CommentMenu from "../CommentMenu";

interface Props {
  data: IComment;
}

const Comment = ({ data }: Props) => {
  const { data: me } = useCurrentUser();
  const userOwner = me?.id === data?.userId ? me : data?.user;

  const avatarSrc = userOwner?.avatar
    ? `${IMAGE_URL}/${userOwner?.avatar}`
    : "";

  const formattedDate = formatDistanceStrict(
    new Date(data.createdAt),
    new Date()
  );

  return (
    <div className="p-4 text-sm border-b first:pt-0">
      <HoverUser data={userOwner}>
        <div className="flex gap-2 cursor-pointer">
          <Avatar className="w-9 h-9">
            <AvatarImage
              src={avatarSrc}
              alt={`${userOwner?.username}-avatar`}
              height={36}
              width={36}
            />
            <AvatarFallback className="text-xs">
              {userOwner?.fullName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center w-full gap-2">
            <p className="font-semibold">@{userOwner?.username}</p>
            <span className="text-muted-foreground hover:underline">·</span>
            <span className="text-muted-foreground">{formattedDate}</span>
          </div>
          {me?.id === data?.userId && (
            <CommentMenu data={data}>
              <MoreHorizontal
                strokeWidth={1}
                className="p-0 ml-auto text-muted-foreground"
              />
            </CommentMenu>
          )}
        </div>
      </HoverUser>
      <p className="mt-2 text-muted-foreground">{data?.content}</p>
    </div>
  );
};

export default memo(Comment);
