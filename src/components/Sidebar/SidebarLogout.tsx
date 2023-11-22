"use client";

import useAuth, { selectClearAuth } from "@global-stores/useAuth";
import { queryClient } from "@global-libs/react-query";
import { keyCurrentUser } from "@services/users/keys";
import { useCurrentUser } from "@services/users";
import { DoorOpen } from "lucide-react";

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
