import { ReactNode } from "react";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export type { MenuProps };
