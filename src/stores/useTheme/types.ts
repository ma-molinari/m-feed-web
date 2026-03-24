enum ColorTheme {
  DARK = `dark`,
  LIGHT = `light`,
}

interface State {
  theme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
}

export { ColorTheme };

export type { State };
