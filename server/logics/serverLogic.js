const express = require('express');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const { DateTime } = require('luxon');
const { serverlogger } = require('../utils/serverlogger.js');
const pool = require("../db.js");
const gracefulShutdown = require('../utils/shutdown.js');
const { corsOptions } = require('../utils/allowedOrigins.js');

// How long to wait for PostgreSQL before giving up. The compose healthcheck
// normally guarantees readiness, so the default is a single attempt; raise
// DB_CONNECT_RETRIES when starting the API against a cold database.
const DB_CONNECT_RETRIES = Number(process.env.DB_CONNECT_RETRIES) || 1;
const DB_CONNECT_RETRY_DELAY_MS = Number(process.env.DB_CONNECT_RETRY_DELAY_MS) || 2000;

const delay = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

// Route modules that are not present in this repository yet must not take the
// whole API down; mount them when they land. Currently: the password-reset
// router, referenced below but never committed.
const optionalRouter = (relativePath) => {
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    return require(relativePath);
  } catch (error) {
    console.warn(`Optional route module ${relativePath} not available: ${error.message}`);
    return (_, res) => res.status(501).json({ error: 'Not implemented' });
  }
};

// Function to start the Express server
const startServer = () => {
  let server;
    // Middlewares
  // Origins come from ALLOWED_ORIGINS (comma-separated) with a localhost dev default.
  app.use(cors(corsOptions()));

  app.use(express.json());
  app.use(helmet());
    // Liveness probe used by docker-compose / hosting platforms.
  app.get('/api/health', (_, res) => res.status(200).json({ status: 'ok' }));
    // Routes
  app.use('/api/auth', require('../routes/authorization/authlogics')); // Auth Route
  app.use('/api/forgot', optionalRouter('../routes/passwordreset/resetlogics')); // Reset Route (module not committed)
  app.use('/api/admin', require('../routes/admindb/farmermanagement')); // Admin Route
  app.use('/api/admin/getdets', require('../routes/admindb/adminacc')); // Admin Details Route
  app.use('/api/homepage', require('../routes/homepage/landing')); // Home Page Route
  app.use('/api/user', require('../routes/farmerdb/farmerdb.js')); // Farmer Products Route
  app.use('/api/market', require('../routes/market/market')); // Market Route
  // Start Server
  const port = Number(process.env.PORT) || 5000;
  server = app.listen(port, () => {
    serverlogger(`Server started on port ${port}`);
  });

  process.on('SIGTERM', () => gracefulShutdown(server));
  process.on('SIGINT', () => gracefulShutdown(server));
  process.on('SIGQUIT', () => gracefulShutdown(server));
};

// Verify the database is reachable, retrying a bounded number of times so a
// container that starts slightly before PostgreSQL does not hard-fail.
const connectWithRetry = async () => {
  for (let attempt = 1; attempt <= DB_CONNECT_RETRIES; attempt += 1) {
    try {
      const client = await pool.connect();
      client.release();
      return;
    } catch (error) {
      const lastAttempt = attempt === DB_CONNECT_RETRIES;
      console.error(
        `PostgreSQL connection attempt ${attempt}/${DB_CONNECT_RETRIES} failed:`,
        error.message
      );
      if (lastAttempt) throw error;
      await delay(DB_CONNECT_RETRY_DELAY_MS);
    }
  }
};

const init = async () => {
  try {
    await connectWithRetry();
    console.log(`Connected to PostgreSQL database! (${pool.describeTarget()})`);
  } catch (error) {
    console.error('Could not reach PostgreSQL, not starting the API:', error.message);
    // The pool is unusable; close it and exit non-zero so a container platform
    // restarts the service instead of serving a broken API.
    await pool.end().catch(() => {});
    setImmediate(() => process.exit(1));
    return;
  }
  serverlogger('PostgreSQL server is up and running, starting Express server...');
  const curtime = DateTime.now().setZone('Asia/Kolkata').toISO();
  serverlogger(`Server started at ${curtime}`);
  startServer();
};

module.exports = { startServer, init };
