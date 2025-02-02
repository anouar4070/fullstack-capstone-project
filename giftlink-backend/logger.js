//Import the Pino logging library
const pino = require('pino');

let logger;

if (process.env.NODE_ENV !== 'production') {
    // In non-production environments, log to the console
    logger = pino({
        level: 'debug',
        transport: {
            target: "pino-pretty",
        },
    });
} else {
    // production
    logger = pino();
}

module.exports = logger;

/**
 * You have to define NODE_ENV manually in your environment.
 * NODE_ENV=development
 */