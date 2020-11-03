const fs = require("fs").promises;
const arguments = require("./arguments.js");
const loggers = require("./loggers.js");
const errors = require("./errors.js");

const args = process.argv.slice(2);

if (args.length > 0) {
  const options = arguments.parse(args);
  const logger = loggers.configureConsoleLogger(options);

  if (!options.help) {
    if (options.directoryPath != "") {
      console.log("Processing notes in " + options.directoryPath);
    } else {
      logger.error(errors.INVALID_DIRECTORY_PATH);
      arguments.printHelp();
      process.exitCode = 1;
    }
  }
} else {
  const logger = loggers.defaultConsole;
  logger.error(errors.INVALID_DIRECTORY_PATH);
  arguments.printHelp();
  process.exitCode = 1;
}
