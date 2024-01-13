import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { State, ColorTheme } from "./types";

export const useTheme = create(
  persist<State>(
    (set) => {
      const setTheme = (theme: ColorTheme) => {
        set(() => ({
          theme,
        }));
      };

      return {
        theme: ColorTheme.DARK,
        setTheme,
      };
    },
    {
      name: "current-theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTheme;

export * from "./selectors";
