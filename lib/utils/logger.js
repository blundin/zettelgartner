const winston = require("winston");
const { format } = require("winston");

const logLevels = ["error", "warn", "info", "http", "verbose", "debug", "silly"];

const console = new winston.transports.Console();

module.exports = function Logger(level) {
  if (!logLevels.includes(level)) {
    level = "info";
  }

  winston.configure({
    level: level,
    format: format.combine(
      format.colorize(),
      format.simple()),
    transports: [ console ]
  });
  return winston;
};
