import { create } from "zustand";

import { State } from "./types";

const usePostManager = create<State>((set) => {
  const setId = (id: number) => {
    set(() => ({
      isOpen: true,
      id,
    }));
  };

  const open = () => {
    set(() => ({
      isOpen: true,
    }));
  };

  const clear = () => {
    set(() => ({
      isOpen: false,
      id: 0,
    }));
  };

  return {
    isOpen: false,
    id: 0,
    setId,
    open,
    clear,
  };
});

export default usePostManager;

export * from "./selectors";
