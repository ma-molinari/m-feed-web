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
    <button className="mx-auto" onClick={onLogout}>
      <Image
        src={"/assets/sidebar/logout-outline.svg"}
        alt="Sign out Icon"
        width={24}
        height={24}
      />
    </button>
  );
};

export default SidebarLogout;
