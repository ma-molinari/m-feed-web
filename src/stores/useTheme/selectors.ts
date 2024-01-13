import { State } from "./types";

export const selectTheme = (state: State) => state.theme;
export const selectSetTheme = (state: State) => state.setTheme;
