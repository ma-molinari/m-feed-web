import react from "@vitejs/plugin-react";
import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: `jsdom`,
    globals: true,
    include: [`src/**/*.{test,spec}.{ts,tsx}`],
  },
  resolve: {
    alias: {
      "@global-components": path.resolve(__dirname, `./src/components`),
      "@global-hooks": path.resolve(__dirname, `./src/hooks`),
      "@global-stores": path.resolve(__dirname, `./src/stores`),
      "@global-libs": path.resolve(__dirname, `./src/libs`),
      "@global-layouts": path.resolve(__dirname, `./src/layouts`),
      "@configs": path.resolve(__dirname, `./src/configs`),
      "@entities": path.resolve(__dirname, `./src/entities`),
      "@services": path.resolve(__dirname, `./src/services`),
      "@modules": path.resolve(__dirname, `./src/modules`),
      components: path.resolve(__dirname, `./src/components`),
      libs: path.resolve(__dirname, `./src/libs`),
    },
  },
});
