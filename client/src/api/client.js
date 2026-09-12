// ----------------------------------------------------------------------
// FaMaS API client (single entry point for every backend call).
//
// Real backend  : VITE_API_URL set  + VITE_DEMO_MODE !== 'true'
//                 -> `return fetch(`${import.meta.env.VITE_API_URL}${path}`, options)`
// Demo backend  : VITE_DEMO_MODE === 'true' OR VITE_API_URL not set
//                 -> the in-memory mock in ./mock answers with a real
//                    `Response` object, so call sites keep using
//                    `response.ok`, `response.status` and `response.json()`.
//
// Demo mode is OFF only when VITE_DEMO_MODE === 'false' AND VITE_API_URL is set.
// See client/.env.example.
// ----------------------------------------------------------------------

import { handleMockRequest } from './mock';

const env = import.meta.env || {};

const DEMO_MODE_FORCED_ON = env.VITE_DEMO_MODE === 'true';
const DEMO_MODE_FORCED_OFF = env.VITE_DEMO_MODE === 'false';
const API_URL = env.VITE_API_URL;

// Auto-fallback: an unset VITE_API_URL is exactly the production bug that
// produced requests to `undefined/api/...`, so demo mode takes over instead.
export const isDemoMode = DEMO_MODE_FORCED_ON || !(DEMO_MODE_FORCED_OFF && API_URL);

const JSON_HEADERS = { 'Content-Type': 'application/json' };

function resolveHandler() {
  if (isDemoMode) {
    if (!DEMO_MODE_FORCED_ON) {
      console.warn(
        '[FaMaS] VITE_API_URL is not set — running in DEMO MODE: all API calls are served ' +
          'by the in-memory mock in src/api/mock (seeded fake data, mutations reset on reload). ' +
          'Set VITE_DEMO_MODE=false and VITE_API_URL=<backend> to use the real backend.'
      );
    }
    return handleMockRequest;
  }
  return (path, options) => fetch(`${API_URL}${path}`, options);
}

const handler = resolveHandler();

/**
 * apiFetch — drop-in replacement for `fetch` on the FaMaS backend.
 *
 * @param {string} path  API path, e.g. '/api/admin/farmers'
 * @param {object} [options] fetch options ({method, headers, body})
 * @returns {Promise<Response>} always a real Response (ok / status / json())
 */
export function apiFetch(path, options = {}) {
  return handler(path, options);
}

export default apiFetch;
