var package = require("./package.json");
const config = require("./config.json");
const optionsParser = require("./lib/options.js");
const help = require("./lib/help.js");
const errors = require("./lib/utils/errors.js");
const Logger = require("./lib/utils/logger.js");
const NoteFiles = require("./lib/notefiles.js");

const args = process.argv.slice(2);

const options = optionsParser.parse(args);

let level = config.logLevel;
if (options.verbose) {
  level = "verbose";
} else if (options.debug) {
  level = "debug";
}

const log = new Logger(level);
log.info(`Zettelgartner v${package.version}`);
log.info(`Logging level: ${level}`);


if (args.length > 0) {

  if (!options.help && !options.error) {
    log.verbose("Started processing notes in " + options.directoryPath);

    NoteFiles.parse(options.directoryPath, log)
      .then((noteTrees) => {
        log.debug(noteTrees);
      })
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

log.info("Done.");
