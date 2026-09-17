import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  base: "/aed-platform/",
  root: resolve(__dirname, "github-pages"),
  publicDir: false,
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, "pages-dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "github-pages/index.html"),
    },
  },
});
