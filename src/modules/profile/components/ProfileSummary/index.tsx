"use client";

import { IMAGE_URL } from "@configs/environment";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@global-components/ui/avatar";
import { Button } from "@global-components/ui/button";
import { Separator } from "@global-components/ui/separator";
import StatsCard from "@modules/profile/components/StatsCard";
import { useCurrentUser, useGet } from "@services/users";

interface Props {
  userId?: number;
}

const ProfileSummary = ({ userId }: Props) => {
  const { data: me } = useCurrentUser();
  const currentUser = userId || me?.id || 0;

  const { data } = useGet(currentUser, { enabled: !!currentUser });

  return (
    <div className="flex flex-col items-center gap-6">
      <Avatar className="w-[150px] h-[150px]">
        <AvatarImage
          src={`${IMAGE_URL}/${data?.avatar}`}
          alt="@shadcn"
          height={150}
          width={150}
        />
        <AvatarFallback>{data?.fullName?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center flex-1">
        <span className="text-xl font-semibold">{data?.fullName}</span>
        <span className="text-sm text-muted-foreground">@{data?.username}</span>
        <span className="mt-4 text-base font-light text-center">
          {data?.bio}
        </span>
        <div className="flex items-center mt-8 space-x-8">
          <StatsCard label="Followers" value={data?.followers || 0} />
          <Separator className="h-10" orientation="vertical" />
          <StatsCard label="Following" value={data?.following || 0} />
          <Separator className="h-10" orientation="vertical" />
          <StatsCard label="Posts" value={data?.posts || 0} />
          {currentUser === me?.id && (
            <>
              <Separator className="h-10" orientation="vertical" />
              <Button variant="outline">Edit Profile</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
