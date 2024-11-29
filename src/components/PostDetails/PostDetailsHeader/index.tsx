import { Post } from "@entities/post";
import { Button } from "@global-components/ui/button";
import { Heart, MessageSquare } from "lucide-react";
import { useLike, useUnlike } from "@services/post";
import { useCallback } from "react";
import { useCurrentUser } from "@services/users";
import HoverUser from "@global-components/HoverUser";
import UserCard from "@global-components/ui/user-card";

interface Props {
  data?: Post;
  onOpenComments: () => void;
}

const PostDetailsHeader = ({ data, onOpenComments }: Props) => {
  const { data: me } = useCurrentUser();
  const userOwner = me?.id === data?.userId ? me : data?.user;

  const { mutate: like } = useLike();
  const { mutate: unlike } = useUnlike();

  const onHandleLike = useCallback(() => {
    if (!data) return;

    if (data?.liked) {
      unlike({ postId: data?.id });
      return;
    }

    like({ postId: data?.id });
  }, [data?.liked]);

  return (
    <div className="flex items-center justify-between w-full">
      <HoverUser data={userOwner}>
        <div>
          <UserCard data={userOwner} />
        </div>
      </HoverUser>

      <div className="flex space-x-4">
        <Button
          className={`p-0 ${
            data?.liked ? "[&>svg]:stroke-red-500 [&>svg]:fill-red-500" : ""
          }`}
          variant="link"
          onClick={onHandleLike}
        >
          <Heart strokeWidth={1.5} size={28} />
        </Button>
        <div className="relative">
          <Button className="p-0" variant="link" onClick={onOpenComments}>
            <MessageSquare strokeWidth={1.5} size={28} />
          </Button>
          <div className="absolute px-2 min-w-[25px] text-center py-1 text-[11px] rounded-full -top-5 -right-4 bg-muted">
            {data?.total_comments || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsHeader;
