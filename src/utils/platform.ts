import { isTauri } from "@tauri-apps/api/core";

export type HostPlatform = "macos" | "windows" | "linux" | "web";

function detectPlatformFromUserAgent(): HostPlatform | null {
  const ua = navigator.userAgent;
  if (/Mac|iPhone|iPad|iPod/i.test(ua)) {
    return "macos";
  }
  if (/Windows/i.test(ua)) {
    return "windows";
  }
  if (/Linux/i.test(ua)) {
    return "linux";
  }
  return null;
}

export function getHostPlatform(): HostPlatform {
  if (!isTauri()) {
    return "web";
  }

  const envPlatform = import.meta.env.TAURI_ENV_PLATFORM;
  if (envPlatform === "macos" || envPlatform === "windows" || envPlatform === "linux") {
    return envPlatform;
  }

  return detectPlatformFromUserAgent() ?? "web";
}

export function isTauriDesktop(): boolean {
  return isTauri();
}

export function usesMacOsOverlayTitlebar(): boolean {
  return getHostPlatform() === "macos";
}

export function usesCustomWindowControls(): boolean {
  const platform = getHostPlatform();
  return platform === "windows" || platform === "linux";
}
