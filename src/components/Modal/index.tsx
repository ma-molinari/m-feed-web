import { Portal } from "react-portal";

import { ModalProps } from "./types";

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-black opacity-30"
        onClick={onClose}
      ></div>
      <div
        className="bg-neutral-800 fixed top-[50%] left-[50%] rounded-xl transform translate-x-[-50%]
translate-y-[-50%]"
      >
        {children}
      </div>
    </Portal>
  );
};

export default Modal;
