import { ReactNode } from "react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@global-components/ui/avatar";
import { Button } from "@global-components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@global-components/ui/hover-card";
import useFollowHandler from "@global-hooks/useFollowHandler";
import { IMAGE_URL } from "@configs/environment";
import { User } from "@entities/user";
import { useCurrentUser } from "@services/users";

interface Props {
  children: ReactNode;
  data?: User | Partial<User>;
}

const HoverUser = ({ children, data }: Props) => {
  const { data: me } = useCurrentUser();
  const { isFollowed, onHandleFollow } = useFollowHandler(data?.id || 0);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex flex-col">
          <div className="flex">
            <Link href={`/profile/${data?.id}/${data?.username}`}>
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={data?.avatar && `${IMAGE_URL}/${data?.avatar}`}
                  alt={data?.username}
                  height={64}
                  width={64}
                />
                <AvatarFallback>{data?.fullName?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
            {Boolean(me?.id !== data?.id) && (
              <Button
                size="sm"
                variant={isFollowed ? `default` : `outline`}
                className="ml-auto"
                onClick={onHandleFollow}
              >
                {isFollowed ? `Unfollow` : `Follow`}
              </Button>
            )}
          </div>
          <div className="mt-2 space-y-3">
            <div>
              <Link
                href={`/profile/${data?.id}/${data?.username}`}
                className="font-semibold line-clamp-1 hover:underline w-max"
              >
                @{data?.fullName}
              </Link>
              <Link
                href={`/profile/${data?.id}/${data?.username}`}
                className="text-sm text-neutral-400 line-clamp-1 w-max"
              >
                @{data?.username}
              </Link>
            </div>
            <p className="text-sm line-clamp-3">{data?.bio}</p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                <b className="text-white">{data?.following || 0}</b> Following
              </span>
              <span className="text-sm text-muted-foreground">
                <b className="text-white">{data?.followers || 0}</b> Followers
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverUser;
