const winston = require("winston");
const { format } = require("winston");

const console = new winston.transports.Console();

module.exports = function Logger(level) {
  console.log(level);
  winston.configure({
    level: level,
    format: format.combine(
      format.colorize(),
      format.simple()),
    transports: [ console ]
  });
  return winston;
};
