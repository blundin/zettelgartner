const optionsParser = require("./lib/options.js");
const help = require("./lib/help.js");
const loggers = require("./lib/utils/loggers.js");
const errors = require("./lib/utils/errors.js");
const NoteFiles = require("./lib/notefiles.js");

const args = process.argv.slice(2);

if (args.length > 0) {
  const options = optionsParser.parse(args);
  const log = loggers.configureConsoleLogger(options);


  if (!options.help && !options.error) {
    log.info("Started processing notes in " + options.directoryPath);

    NoteFiles.parseFiles(options.directoryPath, log)
      .then((fileNames) => {

      })
      .catch((error) => {
        log.error(error);
      });
  } else {
    if (options.error) {
      log.error(options.error);
      process.exitCode = 1;
    }
    help.printHelp();
  }
} else {
  const log = loggers.defaultLogger;
  log.error(errors.INVALID_DIRECTORY_PATH);
  help.printHelp();
  process.exitCode = 1;
}
