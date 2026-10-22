import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const rootDir = import.meta.dirname;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "./src"),
      "next/link": path.resolve(rootDir, "./src/compat/link.jsx"),
      "next/image": path.resolve(rootDir, "./src/compat/image.jsx"),
      "next/navigation": path.resolve(rootDir, "./src/compat/navigation.jsx"),
      "next/font/google": path.resolve(rootDir, "./src/compat/font.jsx"),
      "next/script": path.resolve(rootDir, "./src/compat/script.jsx"),
      "next": path.resolve(rootDir, "./src/compat/next.js"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
