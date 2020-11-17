const util = require("util");
const package = require("./package.json");
const config = require("./config.json");
const optionsParser = require("./lib/options.js");
const help = require("./lib/help.js");
const errors = require("./lib/utils/errors.js");
const Logger = require("./lib/utils/logger.js");
const parseNotes = require("./lib/parsenotes.js");
const buildLinkMap = require("./lib/buildLinkMap");

let level = config.logLevel;
const args = process.argv.slice(2);
const options = optionsParser.parse(args);

if (options.verbose) {
  level = "verbose";
} else if (options.debug) {
  level = "debug";
}
const log = new Logger(level);

app(log);

async function app(log) {
  log.info(`Zettelgartner v${package.version}.`);
  log.info(`Logging level: ${level}.`);

  if (args.length > 0) {
    if (!options.help && !options.error) {
      log.verbose(`Processing notes in ${options.directoryPath}.`);
      try {
        let notesMap = await parseNotes(options.directoryPath, log);
        // log.debug(util.inspect(notesMap, false, null, true));
        log.verbose(`Parsed notes from ${notesMap.size} files.`);

        let linkMap = buildLinkMap(notesMap);
        // log.debug(util.inspect(linkMap, false, null, true));
      } catch(error) {
        handleError(error, true);
      }
    } else {
      if (options.error) {
        handleError(options.error, true);
      }
    }
  } else {
    handleError(errors.INVALID_DIRECTORY_PATH, true);
  }

  log.info("Done.");
}

async function handleError(error) {
  let stack = new Error().stack
  log.error(error);
  log.error(stack);

  if (process.exitCode) {
    help.printHelp();
    process.exitCode = 1;
  }
}
