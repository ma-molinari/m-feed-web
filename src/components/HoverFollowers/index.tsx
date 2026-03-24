import { ReactNode, useMemo } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@global-components/ui/hover-card";
import UserCard from "@global-components/ui/user-card";
import { useGetFollowers, useGetFollowings } from "@services/users";

interface Props {
  children: ReactNode;
  userId: number;
  type: "following" | "followers";
}

const HoverFollowers = ({ children, userId, type }: Props) => {
  const { data: followers } = useGetFollowers(userId, {
    enabled: type === `followers`,
  });

  const { data: followings } = useGetFollowings(userId, {
    enabled: type === `following`,
  });

  const users = useMemo(() => {
    if (type === `followers`) return followers;
    return followings;
  }, [type, followers, followings]);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>{children}</div>
      </HoverCardTrigger>
      <HoverCardContent className={`${!users?.ct ? `hidden` : ``} w-72`}>
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold">
            {type === `followers` ? `Followers` : `Following`}
          </h3>
          <div className="mt-4 space-y-3 overflow-auto max-h-[230px]">
            {users?.data?.map((item) => (
              <div key={item.id}>
                <UserCard data={item} variant="small" />
              </div>
            ))}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverFollowers;
