import { State } from "./types";

export const selectIsOpen = (state: State) => state.isOpen;
export const selectShowComments = (state: State) => state.showComments;
export const selectId = (state: State) => state.id;
export const selectSetId = (state: State) => state.setId;
export const selectSetShowComments = (state: State) => state.setShowComments;
export const selectClear = (state: State) => state.clear;
