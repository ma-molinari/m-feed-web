"use client";

import Image from "next/image";

import useAuth, { selectClearAuth } from "@global-stores/useAuth";
import { queryClient } from "@global-libs/react-query";
import { keyCurrentUser } from "@services/users/keys";
import { useCurrentUser } from "@services/users";

const SidebarLogout = () => {
  useCurrentUser();
  const clearAuth = useAuth(selectClearAuth);

  const onLogout = () => {
    clearAuth();
    queryClient.invalidateQueries(keyCurrentUser());
  };

  return (
    <button
      className="hover:bg-neutral-900 w-[50px] h-[50px] rounded-full transition-colors"
      onClick={onLogout}
    >
      <Image
        src={"/assets/sidebar/logout-outline.svg"}
        alt="Sign out Icon"
        width={26}
        height={26}
        className="mx-auto"
      />
    </button>
  );
};

export default SidebarLogout;
