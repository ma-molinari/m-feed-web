"use client";

import { memo } from "react";
import { useGetUserSuggestions } from "@services/users";
import { Button } from "@global-components/ui/button";
import HoverUser from "@global-components/HoverUser";
import UserSuggestionsLoading from "./UserSuggestionsLoading";
import UserCard from "@global-components/ui/user-card";

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
              <div>
                <UserCard data={item} variant="small" />
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
