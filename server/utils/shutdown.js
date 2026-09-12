const pool = require("../db.js");
const { serverlogger } = require('./serverlogger');

/**
 * Close the HTTP listener and the PostgreSQL pool, then exit.
 * @param {import('http').Server} [server] the listener returned by app.listen()
 */
const gracefulShutdown = (server) => {
    serverlogger('Server is shutting down gracefully...');

    const closePool = () => pool.end((err) => {
        if (err) {
            console.error('Error shutting down the database pool:', err);
        } else {
            console.log('Database pool disconnected');
        }
        console.log('Graceful shut down successful');
        process.exit(0);
    });

    // Give in-flight requests a moment to finish before closing the pool.
    if (server && typeof server.close === 'function') {
        let closed = false;
        const closeAndExit = () => {
            if (closed) return;
            closed = true;
            closePool();
        };
        server.close(closeAndExit);
        setTimeout(closeAndExit, 10000).unref();
    } else {
        closePool();
    }
};

module.exports = gracefulShutdown;
