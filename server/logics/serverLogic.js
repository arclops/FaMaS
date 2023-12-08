const express = require('express');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const { DateTime } = require('luxon');
const { serverlogger } = require('../utils/serverlogger.js');
const { autopsql, checkPostgresStatus, promptForManualStart } = require('../utils/postgresUtils.js');

// Function to start the Express server
const startServer = () => {
    // Middlewares
  app.use(cors({
    origin: 'http://localhost:3030',
    credentials: true,
  }));
  app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
  app.use(express.json());
  app.use(helmet());
    // Routes
  app.use('/api/auth', require('../routes/authorization/authlogics')); // Auth Route
  app.use('/api/forgot', require('../routes/passwordreset/resetlogics')); // Reset Route
  app.use('/api/admin', require('../routes/admindb/farmermanagement')); // Admin Route
  app.use('/api/admin/getdets', require('../routes/admindb/adminacc')); // Admin Details Route
  app.use('/api/homepage', require('../routes/homepage/landing')); // Home Page Route
  app.use('/api/user', require('../routes/farmerdb/farmerdb.js')); // Farmer Products Route
  app.use('/api/market', require('../routes/market/market')); // Market Route
  // Start Server
  app.listen(5000, () => {
    serverlogger('Server started on port 5000');
  });
};

const init = async () => {
    serverlogger('PostgreSQL server is up and running, starting Express server...');
    startServer();
};

module.exports = { startServer, init };
