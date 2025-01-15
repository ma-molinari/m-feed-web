"use client";

import { ReactNode, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Search } from "lucide-react";
import { useSearchUsers } from "@services/users";
import { Button } from "@global-components/ui/button";
import { Input } from "@global-components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@global-components/ui/sheet";
import { useParams } from "next/navigation";
import UserCard from "@global-components/ui/user-card";

const FindUser = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const [search, setSearch] = useState<string>("");
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [debounced] = useDebounceValue(search, 500);

  const { data: users, isLoading } = useSearchUsers(debounced, {
    enabled: !!debounced.length,
  });

  const renderUserList = !isLoading && Boolean(search.length);

  const onOpenChange = () => {
    setSearch("");
    setOpenSheet((prev) => !prev);
  };

  useEffect(() => {
    if (openSheet) onOpenChange();
  }, [params?.username]);

  return (
    <Sheet open={openSheet} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <div>{children}</div>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="hidden" />
        </SheetHeader>

        <div className="flex items-center w-full max-w-sm mt-8 space-x-2">
          <Input
            placeholder="Search"
            aria-label="Search for a user"
            onChange={(event) => setSearch(event.target.value)}
            className="bg-zinc-900"
          />
          <Button type="submit" variant="secondary" aria-label="Search user">
            <Search className="mx-auto" strokeWidth={3} size={20} />
          </Button>
        </div>

        {renderUserList && Boolean(users?.data?.length) && (
          <div className={`flex flex-col mt-4 space-y-4`}>
            {users?.data?.map((item) => (
              <UserCard key={item.id} data={item} />
            ))}
          </div>
        )}

        {renderUserList && !Boolean(users?.data?.length) && (
          <p className="mt-4 text-sm text-center text-neutral-400">
            User not found!
          </p>
        )}

        {!Boolean(search.length) && (
          <p className="px-2 mt-2 text-xs text-neutral-400">
            Try searching for people or username.
          </p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default FindUser;
