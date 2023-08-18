import { Children, cloneElement } from "react";

import Modal from "@global-components/Modal";
import { ModalProps } from "@global-components/Modal/types";

import Item from "./Item";

const Menu = ({ isOpen, onClose, children }: ModalProps) => {
  return Children.map(
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="min-w-[425px] rounded-xl [&>*:last-child]:border-b-0">
        {children}
      </div>
    </Modal>,
    (child) => cloneElement(child)
  );
};

Menu.Item = Item;

export default Menu;
