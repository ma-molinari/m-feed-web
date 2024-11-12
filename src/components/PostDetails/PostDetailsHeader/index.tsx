import Link from "next/link";
import { Post } from "@entities/post";
import { IMAGE_URL } from "@configs/environment";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@global-components/ui/avatar";
import { Button } from "@global-components/ui/button";
import { Heart, MessageSquare } from "lucide-react";
import { useLike, useUnlike } from "@services/post";
import { useCallback } from "react";
import { useCurrentUser } from "@services/users";

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
      <div className="flex items-center space-x-4">
        <Link href={`/profile/${userOwner?.id}/${userOwner?.username}`}>
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={userOwner?.avatar ? `${IMAGE_URL}/${userOwner?.avatar}` : ""}
              alt={userOwner?.username}
              height={48}
              width={48}
            />
            <AvatarFallback>{userOwner?.fullName?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col items-baseline">
          <Link
            href={`/profile/${userOwner?.id}/${userOwner?.username}`}
            className="text-sm font-semibold line-clamp-1 text-card-foreground"
          >
            {userOwner?.username}
          </Link>
          <Button
            variant="link"
            className="p-0 text-left h-max text-muted-foreground"
          >
            Follow
          </Button>
        </div>
      </div>

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
