const express = require('express');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const { DateTime } = require('luxon');
const { serverlogger } = require('../utils/serverlogger.js');
const pool = require("../db.js");
const gracefulShutdown = require('../utils/shutdown.js');
// Function to start the Express server
const startServer = () => {
    // Middlewares
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS.split(',')
  }));

  app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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
  app.listen(process.env.PORT, () => {
    serverlogger(`Server started on port ${process.env.PORT}`);
  });

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
  process.on('SIGQUIT', gracefulShutdown);
};

const init = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database!');
    client.release();
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error.message);
    process.exit(1);
  } finally {
    serverlogger('PostgreSQL server is up and running, starting Express server...');
    const curtime = DateTime.now().setZone('Asia/Kolkata').toISO();
    serverlogger(`Server started at ${curtime}`);
    startServer();
  }
};

module.exports = { startServer, init };
