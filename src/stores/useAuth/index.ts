import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { State } from "./types";

export const useAuth = create(
  persist<State>(
    (set) => {
      const setAuth = (state: Pick<State, "token" | "user">) => {
        set(() => ({
          isAuthenticated: true,
          token: state.token,
          user: state.user,
        }));
      };

      const clearAuth = () => {
        set(() => ({
          isAuthenticated: false,
          token: undefined,
          user: undefined,
        }));
      };

      return {
        isAuthenticated: false,
        token: undefined,
        user: undefined,
        setAuth,
        clearAuth,
      };
    },
    {
      name: "current-user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuth;

export * from "./selectors";
