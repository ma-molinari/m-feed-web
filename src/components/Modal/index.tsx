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
        <div className="min-w-[425px] rounded-xl [&>*:last-child]:border-b-0">
          <button className="w-full p-4 text-sm font-semibold text-center text-red-500 border-b border-neutral-600">
            Delete
          </button>
          <button className="w-full p-4 text-sm font-medium text-center border-b border-neutral-600">
            Go to post
          </button>
          <button className="w-full p-4 text-sm font-medium text-center border-b border-neutral-600">
            Copy link
          </button>
          <button className="w-full p-4 text-sm font-medium text-center border-b border-neutral-600">
            Cancel
          </button>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
