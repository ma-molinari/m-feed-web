"use client";

import { Plus } from "lucide-react";
import usePostManager, { selectSetOpen } from "@global-stores/usePostManager";

const SidebarCreate = () => {
  const setOpen = usePostManager(selectSetOpen);

  return (
    <button
      className="w-[44px] h-[44px] transition-colors dark:border border-2 rounded-lg hover:border-primary [&>svg]:stroke-card-foreground"
      onClick={setOpen}
    >
      <Plus className="mx-auto" strokeWidth={1.5} />
    </button>
  );
};

export default SidebarCreate;
