'use strict'

const options = require('./lib/options.js');
const help = require('./lib/help.js');
const loggers = require('./utils/loggers.js');
const errors = require('./utils/errors.js');
const Processor = require('./lib/NoteProcessor');

const args = process.argv.slice(2);

if (args.length > 0) {
  const selectedOptions = options.parse(args);
  const logger = loggers.configureConsoleLogger(selectedOptions);

  if (!selectedOptions.help) {
    if (!selectedOptions.invalidPath) {
      if (!selectedOptions.invalidOption) {
        logger.info('Started processing notes in ' + selectedOptions.directoryPath);
        const processor = new Processor(selectedOptions.directoryPath);

      } else {
        logger.error(errors.INVALID_OPTION);
        help.printHelp();
        process.exitCode = 1;
      } 
    } else {
      logger.error(errors.INVALID_DIRECTORY_PATH);
      help.printHelp();
      process.exitCode = 1;
    }
  }
} else {
  const logger = loggers.defaultConsole;
  logger.error(errors.INVALID_DIRECTORY_PATH);
  help.printHelp();
  process.exitCode = 1;
}
