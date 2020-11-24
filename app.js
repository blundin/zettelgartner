const util = require("util");
const package = require("./package.json");
const config = require("./config.json");
const optionsParser = require("./lib/options.js");
const help = require("./lib/help.js");
const errors = require("./lib/utils/errors.js");
const Logger = require("./lib/utils/logger.js");
const parseNotes = require("./lib/parse_notes.js");

async function main() {
  const args = process.argv.slice(2);
  const [options, log] = initialize(args);
  if (args.length == 0) {
    handleError(log, errors.INVALID_DIRECTORY_PATH, true);
    return;
  }

  if (!options.help && !options.error) {
    try {
      const notesMap = buildNotesMap(log);
      const features = config.features;
      if (features.backlinks.enabled) {
        
      }

      // if (features.tags.enabled) {}
      // if (features.reports.enabled) {}
    } catch(error) {
      handleError(log, error, true);
    }
  } else {
    if (options.error) {
      handleError(log, options.error, true);
      return;
    } else {
      help.printHelp();
      return;
    }
  }
  log.info("Done.");
}

function initialize(args) {
  let level = config.logLevel;
  const options = optionsParser.parse(args);

  if (options.verbose) {
    level = "verbose";
  } else if (options.debug) {
    level = "debug";
  }
  const log = new Logger(level);
  log.info(`Zettelgartner v${package.version}.`);
  log.info(`Logging level: ${level}.`);

  return [options, log];
}

async function buildNotesMap(directoryPath, log) {
  log.verbose(`Processing notes in ${directoryPath}.`);
  let notesMap = await parseNotes(directoryPath, log);
  log.verbose(`Parsed notes from ${notesMap.size} files.`);
  log.debug(util.inspect(notesMap, false, null, true));
  
  return notesMap;
}

async function handleError(log, error, fatal) {
  let stack = new Error().stack
  log.error(error);
  log.error(stack);

  if (fatal) {
    help.printHelp();
    process.exitCode = 1;
  }
}

main();