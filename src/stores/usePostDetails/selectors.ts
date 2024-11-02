import { State } from "./types";

export const selectIsOpen = (state: State) => state.isOpen;
export const selectId = (state: State) => state.id;
export const selectSetId = (state: State) => state.setId;
export const selectClear = (state: State) => state.clear;
