const pino = require("pino");
const path = require("path");

const logFilePath = path.join(__dirname, "..", "..", "logs", "pino-log.log");
const logger = pino(
    pino.destination(logFilePath),
);

module.exports = logger;