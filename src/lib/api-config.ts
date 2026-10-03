/**
 * API configuration for Chotelal ji Health
 * Backend Target: Cloudflare Workers (https://chotelalji.sumitshrivas24.workers.dev)
 */

export const CLOUDFLARE_WORKERS_URL = 'https://chotelalji-tts.sumitshrivas24.workers.dev';

export function getApiEndpoint(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Special case for /api/tts
  if (path === '/api/tts') {
    return 'https://chotelalji-tts.sumitshrivas24.workers.dev/';
  }

  // In local development environment, use relative path so local Express/Vite server handles it
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host.includes('run.app')) {
      return cleanPath;
    }
  }

  // When deployed to production on Firebase Hosting, route backend API requests to Cloudflare Workers
  return `${CLOUDFLARE_WORKERS_URL}${cleanPath}`;
}

/**
 * Resilient fetcher that attempts the Cloudflare Worker URL, and if unavailable,
 * seamlessly falls back to the same-origin endpoint.
 */
export async function fetchWithFallback(path: string, options: RequestInit = {}): Promise<Response> {
  const primaryUrl = getApiEndpoint(path);

  try {
    const res = await fetch(primaryUrl, options);
    if (res.ok || res.status < 500) {
      return res;
    }
    throw new Error(`Primary endpoint returned status ${res.status}`);
  } catch (primaryErr) {
    // If we tried external Cloudflare Worker and it was unreachable or blocked, fallback to same origin
    if (primaryUrl.startsWith('http')) {
      console.warn(`[Cloudflare API Fallback] ${primaryUrl} failed, trying local endpoint: ${path}`);
      return fetch(path, options);
    }
    throw primaryErr;
  }
}
