const INTERACTIVE_SELECTOR =
  "button, a, input, textarea, select, [role='button'], .p-menuitem-link, .p-dropdown, .p-dropdown-label, .p-dropdown-trigger, .p-inputtext, .app-shell-window-control";

export function isInteractiveTitlebarTarget(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && Boolean(target.closest(INTERACTIVE_SELECTOR));
}
