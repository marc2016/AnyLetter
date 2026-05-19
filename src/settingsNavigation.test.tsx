import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { act } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi, afterEach } from "vitest";
import { AppProviders } from "./components/providers/AppProviders";
import { AppLayout } from "./components/layout/AppLayout";
import { SettingsView } from "./components/views/SettingsView";
import { DraftProvider } from "./context/DraftContext";
import { ShellNavigationProvider } from "./context/ShellNavigationContext";

afterEach(() => {
  cleanup();
});

vi.mock("@tauri-apps/api/path", () => ({
  BaseDirectory: { AppData: 1 },
  appDataDir: vi.fn().mockResolvedValue("/mock/appdata"),
  join: vi.fn(async (...args: string[]) => args.join("/")),
}));

vi.mock("@tauri-apps/api/window", () => ({
  getCurrentWindow: vi.fn().mockReturnValue({
    onCloseRequested: vi.fn().mockResolvedValue(() => {}),
    destroy: vi.fn(),
    minimize: vi.fn(),
    toggleMaximize: vi.fn(),
    close: vi.fn(),
    startDragging: vi.fn(),
  }),
}));

vi.mock("@tauri-apps/plugin-fs", () => ({
  exists: vi.fn(async () => false),
  mkdir: vi.fn(async () => {}),
  readDir: vi.fn(async () => []),
  readTextFile: vi.fn(async () => ""),
  writeTextFile: vi.fn(async () => {}),
  remove: vi.fn(async () => {}),
}));

function renderShell(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AppProviders>
        <DraftProvider>
          <ShellNavigationProvider>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/letters" element={<div>Explorer</div>} />
                <Route path="/settings" element={<SettingsView />} />
              </Route>
            </Routes>
          </ShellNavigationProvider>
        </DraftProvider>
      </AppProviders>
    </MemoryRouter>,
  );
}

describe("settings navigation", () => {
  it("renders language control on the settings page", async () => {
    renderShell("/settings");

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Settings" })).toBeDefined();
    });
    expect(screen.getByText("Language")).toBeDefined();
    expect(screen.getByRole("button", { name: "Settings" })).toBeDefined();
  });

  it("navigates to settings when the gear button is clicked", async () => {
    renderShell("/letters");

    await waitFor(() => {
      expect(screen.getByText("Explorer")).toBeDefined();
    });

    act(() => {
      screen.getByRole("button", { name: "Settings" }).click();
    });

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Settings" })).toBeDefined();
    });
    expect(screen.getByText("Settings", { selector: ".p-menuitem-text" })).toBeDefined();
  });
});
