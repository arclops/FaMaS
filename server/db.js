const Pool = require("pg").Pool;
require("dotenv").config();

/**
 * Connection settings come from the environment only.
 *
 * Preferred: a single connection string (Render/Railway/Fly/Heroku all provide one)
 *   POSTGRES_URL=postgres://user:password@host:5432/database
 *
 * Alternative: discrete PG* variables, which are also what the official
 * `postgres` Docker image consumes:
 *   PGHOST / PGPORT / PGUSER / PGPASSWORD / PGDATABASE
 *
 * The fallbacks below are local development defaults for the compose/dev
 * database only — production deployments must set real values, and the
 * connection simply fails loudly if they are missing.
 */
const connection = () => {
    if (process.env.POSTGRES_URL) {
        return { connectionString: process.env.POSTGRES_URL };
    }
    return {
        host: process.env.PGHOST || 'localhost',
        port: Number(process.env.PGPORT) || 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'postgres',
        database: process.env.PGDATABASE || 'famas',
    };
};

// Managed Postgres providers commonly require TLS with a provider-supplied CA
// that Node does not trust by default; PGSSL=true opts in explicitly.
const useSsl = /^(1|true|yes)$/i.test(process.env.PGSSL || '');

const pool = new Pool({
    ...connection(),
    ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
});

/** Connection target with the password redacted, safe to log at startup. */
const describeTarget = () => {
    if (process.env.POSTGRES_URL) {
        try {
            const url = new URL(process.env.POSTGRES_URL);
            return `${url.hostname}:${url.port || 5432}${url.pathname}`;
        } catch {
            return 'POSTGRES_URL (unparseable)';
        }
    }
    const { host, port, database } = connection();
    return `${host}:${port}/${database}`;
};

pool.on('error', (err) => {
    console.error('Unexpected PostgreSQL pool error:', err.message);
});

module.exports = pool;
module.exports.describeTarget = describeTarget;
