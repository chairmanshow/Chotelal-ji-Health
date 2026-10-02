/**
 * API configuration for Chotelal ji Health
 * Always routes directly to full-stack Express backend (/api/*) for instant response
 */

export function getApiEndpoint(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

export async function fetchWithFallback(path: string, options: RequestInit = {}): Promise<Response> {
  const endpoint = getApiEndpoint(path);
  return fetch(endpoint, options);
}
