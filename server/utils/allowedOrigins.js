/**
 * Single source of truth for CORS origin policy.
 *
 * ALLOWED_ORIGINS is a comma-separated list, e.g.
 *   ALLOWED_ORIGINS=http://localhost:3030,https://famas-client.vercel.app
 *
 * Vercel preview deployments get a unique hostname per deployment, so either
 * list every preview origin explicitly, or pin previews with a wildcard
 * pattern such as https://famas-*.vercel.app
 */

// Dev fallback only: the Vite dev server (client/vite.config.js) and `vite preview`.
const DEFAULT_DEV_ORIGINS = ['http://localhost:3030'];

const parseAllowedOrigins = (raw) =>
  (raw || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const allowedOrigins = () => {
  const configured = parseAllowedOrigins(process.env.ALLOWED_ORIGINS);
  return configured.length > 0 ? configured : DEFAULT_DEV_ORIGINS;
};

/** Convert an allowed-origin pattern with `*` into an anchored regex. */
const toPattern = (pattern) => {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
  return new RegExp(`^${escaped}$`);
};

const isAllowedOrigin = (origin) => {
  const patterns = allowedOrigins().map(toPattern);
  return patterns.some((pattern) => pattern.test(origin));
};

/**
 * Resolve the value to echo in Access-Control-Allow-Origin for a request.
 * Returns undefined when the request origin is not allowed, which makes the
 * cors() middleware omit the header instead of leaking a permissive one.
 */
const resolveAllowedOrigin = (requestOrigin) => {
  if (!requestOrigin) return undefined;
  return isAllowedOrigin(requestOrigin) ? requestOrigin : undefined;
};

/** cors() options object built from the same policy. */
const corsOptions = () => ({
  origin: (requestOrigin, callback) => callback(null, resolveAllowedOrigin(requestOrigin)),
  credentials: true,
});

module.exports = { allowedOrigins, corsOptions, isAllowedOrigin, resolveAllowedOrigin };
