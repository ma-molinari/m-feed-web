import { State } from "./types";

export const selectToken = (state: State) => state.token;
export const selectUser = (state: State) => state.user;
export const selectIsAuthenticated = (state: State) => state.isAuthenticated;
export const selectSetAuth = (state: State) => state.setAuth;
export const selectClearAuth = (state: State) => state.clearAuth;
