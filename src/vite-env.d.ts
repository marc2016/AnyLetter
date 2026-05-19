/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly TAURI_ENV_PLATFORM?: "macos" | "windows" | "linux" | "android" | "ios";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
