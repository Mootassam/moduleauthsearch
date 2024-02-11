import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.tsx",
    }),
  ],

  server: {
    host: "192.168.90.76",
    port: 80,
  },

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
