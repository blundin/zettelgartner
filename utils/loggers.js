const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const defaultLogLevel = "info";

const defaultConsole = createLogger({
  level: defaultLogLevel,
  format: format.simple(),
  transports: [
    new transports.Console()
  ]
});

const configureConsoleLogger = function(options) {
  var logLevel = defaultLogLevel;

  if (options.debug == true) {
    logLevel = "debug"
  } else if (options.verbose == true) {
    logLevel = "verbose"
  }

  const console = createLogger({
    level: logLevel,
    format: format.combine(
      format.colorize(),
      format.simple()
    ),
    transports: [
      new transports.Console()
    ]
  });
  return console;
};

exports.defaultConsole = defaultConsole;
exports.configureConsoleLogger = configureConsoleLogger;
