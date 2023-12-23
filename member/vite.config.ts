import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      include: "**/*.tsx",
    }),
  ],

  resolve: {
    alias: {
      "@component": path.resolve(__dirname, "src/component"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@data": path.resolve(__dirname, "src/data"),
      "@config": path.resolve(__dirname, "src/config"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@view": path.resolve(__dirname, "src/view"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@security": path.resolve(__dirname, "src/security"),
      "@i18n": path.relative(__dirname, "src/i18n"),
    },
  },
});
