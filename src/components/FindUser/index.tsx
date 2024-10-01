"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useDebounce } from "usehooks-ts";
import { Search } from "lucide-react";
import { useSearchUsers } from "@services/users";
import { Button } from "@global-components/ui/button";
import { Input } from "@global-components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@global-components/ui/sheet";
import UserCard from "./UserCard";

const FindUser = ({ children }: any) => {
  const [search, setSearch] = useState<string>("");
  const debounced = useDebounce(search, 500);

  const { data: users, isLoading } = useSearchUsers(debounced, {
    enabled: !!debounced.length,
  });

  const renderUserList = !isLoading && Boolean(debounced.length);

  const getOpacityClass = (condition: boolean) => {
    return condition ? "opacity-1" : "opacity-0";
  };

  const userList = useMemo(() => {
    return users?.data?.map((item) => <UserCard key={item.id} data={item} />);
  }, [users]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>{children}</div>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex items-center w-full max-w-sm mt-8 space-x-2">
          <Input
            placeholder="Find user..."
            aria-label="Search for a user"
            onChange={(event) => setSearch(event.target.value)}
          />
          <Button type="submit" variant="secondary" aria-label="Search user">
            <Search className="mx-auto" strokeWidth={3} size={20} />
          </Button>
        </div>

        <div
          className={`flex flex-col mt-4 space-y-4 transition-opacity duration-300 ${getOpacityClass(
            renderUserList
          )}`}
        >
          {userList}
          {renderUserList && users?.data?.length === 0 && (
            <p className="text-sm text-center text-primary">User not found!</p>
          )}
        </div>

        <div
          className={`relative h-[10rem] mt-8 transition-opacity duration-300 ${getOpacityClass(
            !renderUserList && !search.length
          )}`}
        >
          <Image
            src={`/assets/users/people-search.svg`}
            alt={`Search user`}
            fill
            priority
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FindUser;
