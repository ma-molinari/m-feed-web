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
import ProfileEditDialog from "../ProfileEditDialog";
import ProfileEditPasswordDialog from "../ProfileEditPasswordDialog";
import HoverFollowers from "@global-components/HoverFollowers";
import ProfileSummaryLoading from "../ProfileSummaryLoading";

interface Props {
  userId?: number;
}

const ProfileSummary = ({ userId }: Props) => {
  const { data: me } = useCurrentUser();
  const currentUser = userId || me?.id || 0;

  const { data, isLoading } = useGet(currentUser, { enabled: !!currentUser });

  if (isLoading) {
    return <ProfileSummaryLoading />;
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <Avatar className="w-[150px] h-[150px]">
        <AvatarImage
          src={`${IMAGE_URL}/${data?.avatar}`}
          alt={data?.username}
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
          <HoverFollowers userId={currentUser} type="followers">
            <StatsCard label="Followers" value={data?.followers || 0} />
          </HoverFollowers>
          <Separator className="h-10" orientation="vertical" />
          <HoverFollowers userId={currentUser} type="following">
            <StatsCard label="Following" value={data?.following || 0} />
          </HoverFollowers>
          <Separator className="h-10" orientation="vertical" />
          <StatsCard label="Posts" value={data?.posts || 0} />
          {currentUser === me?.id && (
            <>
              <Separator className="h-10" orientation="vertical" />
              <ProfileEditDialog>
                <Button variant="outline">Edit Profile</Button>
              </ProfileEditDialog>
              <ProfileEditPasswordDialog>
                <Button variant="outline">Edit Password</Button>
              </ProfileEditPasswordDialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
