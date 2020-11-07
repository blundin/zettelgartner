const options = require('./lib/options.js');
const help = require('./lib/help.js');
const loggers = require('./lib/utils/loggers.js');
const errors = require('./lib/utils/errors.js');
const { getFilenames } = require('./lib/getFilenames');

const args = process.argv.slice(2);

if (args.length > 0) {
  const selectedOptions = options.parse(args);
  const log = loggers.configureConsoleLogger(selectedOptions);

  if (!selectedOptions.help) {
    if (!selectedOptions.invalidPath) {
      if (!selectedOptions.invalidOption) {
        log.info('Started processing notes in ' + selectedOptions.directoryPath);

        getFilenames(selectedOptions.directoryPath, log)
          .then((fileNames) => {
            for (var i = 0; i < fileNames.length; i++) {

            }
          });
      } else {
        log.error(errors.INVALID_OPTION);
        help.printHelp();
        process.exitCode = 1;
      }
    } else {
      log.error(errors.INVALID_DIRECTORY_PATH);
      help.printHelp();
      process.exitCode = 1;
    }
  }
} else {
  const log = loggers.defaultLogger;
  log.error(errors.INVALID_DIRECTORY_PATH);
  help.printHelp();
  process.exitCode = 1;
}
