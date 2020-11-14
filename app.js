const package = require("./package.json");
const config = require("./config.json");
const optionsParser = require("./lib/options.js");
const help = require("./lib/help.js");
const errors = require("./lib/utils/errors.js");
const Logger = require("./lib/utils/logger.js");
const parseNotes = require("./lib/parsenotes.js");
const buildLinkMaps = require("./lib/buildLinkMaps");

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
        let treeMap = await parseNotes(options.directoryPath, log);
        log.info(`Parsed notes from ${treeMap.size} files.`);
        let [ linkMap, permalinks ] = await buildLinkMaps(treeMap, log);
        log.debug(`Permalinks: ${permalinks.length}`);
        
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

async function handleError(error, fatal) {
  let stack = new Error().stack
  log.error(error);
  log.error(stack);

  if (process.exitCode) {
    help.printHelp();
    process.exitCode = 1;
  }
}
