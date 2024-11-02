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

interface Props {
  data?: Post;
  onHandleLike: () => void;
  onOpenComments: () => void;
}

const PostDetailsHeader = ({ data, onHandleLike, onOpenComments }: Props) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <Link href={`/user/${data?.user?.username}`}>
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={data?.user?.avatar && `${IMAGE_URL}/${data?.user?.avatar}`}
              alt={data?.user?.username}
              height={48}
              width={48}
            />
            <AvatarFallback>{data?.user?.fullName[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col items-baseline">
          <Link
            href={`/user/${data?.user?.username}`}
            className="text-sm font-semibold line-clamp-1 text-card-foreground"
          >
            {data?.user?.username}
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
            {data?.total_likes || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsHeader;
