const winston = require("winston");
const defaultLogLevel = "info";

const defaultConsole = winston.createLogger({
  level: defaultLogLevel,
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console()
  ]
});

const configureConsoleLogger = function(options) {
  var logLevel = defaultLogLevel;

  if (options.debug == true) {
    logLevel = "debug"
  } else if (options.verbose == true) {
    logLevel = "verbose"
  }

  const console = winston.createLogger({
    level: logLevel,
    format: winston.format.simple(),
    transports: [
      new winston.transports.Console()
    ]
  });
  return console;
};

exports.defaultConsole = defaultConsole;
exports.configureConsoleLogger = configureConsoleLogger;
