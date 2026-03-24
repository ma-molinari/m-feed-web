"use client";

import { DoorOpen } from "lucide-react";
import useAuth, { selectClearAuth } from "@global-stores/useAuth";
import { queryClient } from "@global-libs/react-query";
import { useCurrentUser } from "@services/users";
import { keyCurrentUser } from "@services/users/keys";

const SidebarLogout = () => {
  useCurrentUser();
  const clearAuth = useAuth(selectClearAuth);

  const onLogout = () => {
    clearAuth();
    queryClient.invalidateQueries(keyCurrentUser());
  };

  return (
    <button
      className="w-[44px] h-[44px] transition-colors dark:border border-2 rounded-lg hover:border-primary [&>svg]:stroke-card-foreground"
      onClick={onLogout}
    >
      <DoorOpen className="mx-auto" strokeWidth={1.5} />
    </button>
  );
};

export default SidebarLogout;
