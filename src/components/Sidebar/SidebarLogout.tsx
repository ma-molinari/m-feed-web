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
      className="w-[50px] h-[50px] transition-colors border rounded-lg text-card-foreground hover:border-primary"
      onClick={onLogout}
    >
      {/* <Image
        src={"/assets/sidebar/logout-outline.svg"}
        alt="Sign out Icon"
        width={26}
        height={26}
        className="mx-auto"
      /> */}
      <p>H</p>
    </button>
  );
};

export default SidebarLogout;
