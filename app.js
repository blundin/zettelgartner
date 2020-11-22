const util = require("util");
const package = require("./package.json");
const config = require("./config.json");
const optionsParser = require("./lib/options.js");
const help = require("./lib/help.js");
const errors = require("./lib/utils/errors.js");
const Logger = require("./lib/utils/logger.js");
const parseNotes = require("./lib/parse_notes.js");

let level = config.logLevel;
const args = process.argv.slice(2);
const options = optionsParser.parse(args);

if (args.length == 0) {
  handleError(errors.INVALID_DIRECTORY_PATH, true);
}

if (options.verbose) {
  level = "verbose";
} else if (options.debug) {
  level = "debug";
}
const log = new Logger(level);

main(log);

async function main(log) {
  log.info(`Zettelgartner v${package.version}.`);
  log.info(`Logging level: ${level}.`);

  if (!options.help && !options.error) {
    log.verbose(`Processing notes in ${options.directoryPath}.`);
    try {
      let notesMap = await parseNotes(options.directoryPath, log);
      log.debug(util.inspect(notesMap, false, null, true));
      log.verbose(`Parsed notes from ${notesMap.size} files.`);
    } catch(error) {
      handleError(error, true);
    }
  } else {
    if (options.error) {
      handleError(options.error, true);
    }
  }
  log.info("Done.");
}

async function handleError(error, fatal) {
  let stack = new Error().stack
  log.error(error);
  log.error(stack);

  if (fatal) {
    help.printHelp();
    process.exitCode = 1;
  }
}
