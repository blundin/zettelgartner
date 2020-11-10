const config = require("./config.json");
const optionsParser = require("./lib/options.js");
const help = require("./lib/help.js");
const errors = require("./lib/utils/errors.js");
const Logger = require("./lib/utils/logger.js");
const NoteFiles = require("./lib/notefiles.js");

const args = process.argv.slice(2);

const options = optionsParser.parse(args);

let level = config.logLevel;
if (options.debug) {
  level = "debug";
} else if (options.verbose) {
  level = "verbose";
}

const log = new Logger(level);
log.debug("Debug is enabled.");

if (args.length > 0) {

  if (!options.help && !options.error) {
    log.info("Started processing notes in " + options.directoryPath);

    const notes = NoteFiles.parse(options.directoryPath, log);
  } else {
    if (options.error) {
      log.error(options.error);
      process.exitCode = 1;
    }
    help.printHelp();
  }
} else {
  log.error(errors.INVALID_DIRECTORY_PATH);
  help.printHelp();
  process.exitCode = 1;
}
