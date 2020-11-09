const winston = require("winston");
const { format }

const console = new winston.transports.Console();

module.exports = (level) => {
  console.log(level);
  winston.configure({
    logLevel: level,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()),
    transports: [ console ]
  });
  return winston;
};
