/// <reference types="vitest" />
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const pakoZlib = (file: string) =>
  path.resolve(projectRoot, "node_modules/pako/lib/zlib", file);

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],
  envPrefix: ["VITE_", "TAURI_"],
  resolve: {
    alias: {
      "pako/lib/zlib/zstream.js": pakoZlib("zstream.js"),
      "pako/lib/zlib/deflate.js": pakoZlib("deflate.js"),
      "pako/lib/zlib/inflate.js": pakoZlib("inflate.js"),
      "pako/lib/zlib/constants.js": pakoZlib("constants.js"),
    },
  },
  optimizeDeps: {
    include: ["@react-pdf/renderer", "pako"],
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
