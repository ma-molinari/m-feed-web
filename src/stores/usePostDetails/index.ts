import { create } from "zustand";

import { State } from "./types";

const usePostDetails = create<State>((set) => {
  const setId = (id: number, showComments?: boolean) => {
    set(() => ({
      isOpen: true,
      showComments,
      id,
    }));
  };

  const setShowComments = (showComments: boolean) => {
    set(() => ({
      showComments,
    }));
  };

  const clear = () => {
    set(() => ({
      isOpen: false,
      showComments: false,
      id: 0,
    }));
  };

  return {
    isOpen: false,
    showComments: false,
    id: 0,
    setId,
    setShowComments,
    clear,
  };
});

export default usePostDetails;

export * from "./selectors";
