import { create } from "zustand";

import { State } from "./types";

const usePostDetails = create<State>((set) => {
  const setId = (id: number) => {
    set(() => ({
      isOpen: true,
      id,
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
    clear,
  };
});

export default usePostDetails;

export * from "./selectors";
