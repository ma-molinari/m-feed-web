"use client";

import { memo } from "react";
import { IMAGE_URL } from "@configs/environment";
import { useGetUserSuggestions } from "@services/users";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@global-components/ui/avatar";
import { Button } from "@global-components/ui/button";
import HoverUser from "@global-components/HoverUser";
import UserSuggestionsLoading from "./UserSuggestionsLoading";

const UserSuggestions = () => {
  const { data: suggestions, isLoading } = useGetUserSuggestions();

  if (isLoading) {
    return <UserSuggestionsLoading />;
  }

  return (
    <div className="sticky p-4 border shadow-sm top-4 w-[320px] h-fit">
      <h3 className="font-semibold">Users to follow</h3>
      <div className="flex flex-col mt-4 gap-y-4">
        {suggestions?.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <HoverUser data={item}>
              <div className="flex items-center gap-3 cursor-pointer">
                <Avatar className="w-9 h-9">
                  <AvatarImage
                    src={item?.avatar && `${IMAGE_URL}/${item?.avatar}`}
                    alt={item?.username}
                    height={36}
                    width={36}
                  />

                  <AvatarFallback className="text-xs">
                    {item?.fullName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-semibold line-clamp-1">
                    {item?.fullName}
                  </p>
                  <p className="text-xs text-neutral-400 line-clamp-1">
                    @{item?.username}
                  </p>
                </div>
              </div>
            </HoverUser>
            <Button size="sm" variant="outline" className="ml-auto">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(UserSuggestions);
