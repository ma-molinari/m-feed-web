"use client";

import { useGetUserSuggestions } from "@services/users";
import Suggestion from "./Suggestion";
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
          <Suggestion key={item.id} data={item} />
        ))}
        {Boolean(suggestions?.length) || (
          <p className="text-neutral-400 text-sm">No suggestions found.</p>
        )}
      </div>
    </div>
  );
};

export default UserSuggestions;
