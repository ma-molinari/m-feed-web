import { memo } from "react";
import { MoreHorizontal } from "lucide-react";
import { Comment as IComment } from "@entities/comment";
import { useCurrentUser } from "@services/users";
import HoverUser from "@global-components/HoverUser";
import CommentMenu from "../CommentMenu";
import UserCardInline from "@global-components/ui/user-card-inline";

interface Props {
  data: IComment;
}

const Comment = ({ data }: Props) => {
  const { data: me } = useCurrentUser();
  const userOwner = me?.id === data?.userId ? me : data?.user;

  return (
    <div className="p-4 border-b first:pt-0">
      <HoverUser data={userOwner}>
        <div className="flex gap-2 cursor-pointer">
          <UserCardInline data={userOwner} createdAt={data?.createdAt} />
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
