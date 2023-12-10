const pool = require("../db.js");
const { serverlogger } = require('./serverlogger');

const gracefulShutdown = () => {
    serverlogger('Server is shutting down gracefully...');
    pool.end((err) => {
    if (err) {
        console.error('Error shutting down the database pool:', err);
    } else {
        console.log('Database pool disconnected');
    }
    console.log('Graceful shut down successful');
    process.exit(0);
    });
};

module.exports = gracefulShutdown;
