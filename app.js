const util = require("util");
const package = require("./package.json");
const config = require("./config.json");
const optionsParser = require("./lib/options.js");
const help = require("./lib/help.js");
const errors = require("./lib/utils/errors.js");
const Logger = require("./lib/utils/logger.js");
const parseNotes = require("./lib/parse_notes.js");
const updateBacklinks = require("./lib/update_backlinks.js");

async function main() {
  const [options, log] = initialize(process.argv.slice(2));

  if (!options.help && !options.error) {
    try {
      const notesMap = await buildNotesMap(options.directoryPath, log);
      if (config.features.backlinks.enabled) {
        try {
          notesMap = await updateBacklinks(notesMap);
          
        } catch(error) {

        }
      }

      // if (config.features.tags.enabled) {}
      // if (config.features.reports.enabled) {}
      cleanUp(log);
    } catch(error) {
      handleError(log, error, true);
      cleanUp(log);
    }
  } else {
    if (options.error) {
      handleError(log, options.error, true);
      cleanUp(log);
    } else {
      help.printHelp();
      cleanUp(log);
    }
  }
}

function initialize(args) {
  let options = {};

  if (args.length == 0) {
    console.log(errors.INVALID_DIRECTORY_PATH);
    help.printHelp();
    options.error = errors.INVALID_DIRECTORY_PATH;
    return [options, null];
  } else {
    let level = config.logLevel;
    options = optionsParser.parse(args);

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
}

function cleanUp(log) {
  log.info("Done.");
}

async function buildNotesMap(directoryPath, log) {
  log.verbose(`Processing notes in ${directoryPath}.`);
  const notesMap = await parseNotes(directoryPath, log);
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