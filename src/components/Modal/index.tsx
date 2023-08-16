import { useEffect } from "react";
import { Portal } from "react-portal";

const Modal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document?.querySelector?.("body")?.classList.add("overflow-hidden");
    }

    return () => {
      document?.querySelector?.("body")?.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

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
        className="h-[500px] w-[500px] bg-white fixed top-[50%] left-[50%]"
        style={{ transform: `translate(-50%, -50%)` }}
      >
        <p>olaaaa</p>
      </div>
    </Portal>
  );
};

export default Modal;
