import { Children, cloneElement } from "react";
import { Dialog, DialogContent } from "@global-components/ui/dialog";

import Item from "./Item";
import { MenuProps } from "./types";

const Menu = ({ isOpen, onClose, children }: MenuProps) => {
  return Children.map(
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="[&>*:last-child]:border-b-0">{children}</div>
      </DialogContent>
    </Dialog>,
    (child) => cloneElement(child)
  );
};

Menu.Item = Item;

export default Menu;
