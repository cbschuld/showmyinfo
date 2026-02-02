import { signal, computed } from '@preact/signals';
import type { ServerInfo, ClientInfo } from '@showmyinfo/shared';

// State signals
export const serverInfo = signal<ServerInfo | null>(null);
export const clientInfo = signal<ClientInfo | null>(null);
export const isLoading = signal(true);
export const error = signal<string | null>(null);
// Initialize dark mode from localStorage, falling back to system preference
function getInitialDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem('darkMode');
  if (stored !== null) {
    return stored === 'true';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export const darkMode = signal(getInitialDarkMode());

// Derived state
export const isReady = computed(() => serverInfo.value !== null && clientInfo.value !== null);

// Actions
export function setServerInfo(info: ServerInfo) {
  serverInfo.value = info;
}

export function setClientInfo(info: ClientInfo) {
  clientInfo.value = info;
}

export function setLoading(loading: boolean) {
  isLoading.value = loading;
}

export function setError(err: string | null) {
  error.value = err;
}

export function toggleDarkMode() {
  darkMode.value = !darkMode.value;
  if (typeof window !== 'undefined') {
    localStorage.setItem('darkMode', String(darkMode.value));
    document.documentElement.classList.toggle('dark', darkMode.value);
  }
}

// Initialize dark mode class
if (typeof document !== 'undefined') {
  document.documentElement.classList.toggle('dark', darkMode.value);
}
