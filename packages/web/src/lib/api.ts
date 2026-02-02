import type { ServerInfo } from '@showmyinfo/shared';

// Use the Cloudflare Worker URL in production, or local dev server
const API_URL = import.meta.env.PROD
  ? 'https://showmyinfo-api.cbschuld-f57.workers.dev'
  : 'http://localhost:8787';

export async function fetchServerInfo(): Promise<ServerInfo> {
  const response = await fetch(`${API_URL}/info`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.server;
}
