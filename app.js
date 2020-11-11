const path = require("path");

var package = require("./package.json");
const config = require("./config.json");
const optionsParser = require("./lib/options.js");
const help = require("./lib/help.js");
const errors = require("./lib/utils/errors.js");
const Logger = require("./lib/utils/logger.js");
const { getFilenames, parseFile } = require("./lib/notefiles.js");

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
  let files = [];
  let parsers = [];

  log.info(`Zettelgartner v${package.version}`);
  log.info(`Logging level: ${level}`);

  if (args.length > 0) {
    if (!options.help && !options.error) {
      log.verbose("Processing notes in " + options.directoryPath);

      try {
        files = await getFilenames(options.directoryPath);
      } catch(error) {
        handleError(error, true);
      }

      const filePaths = files.map(fileName => path.join(options.directoryPath, fileName));
      log.debug("File names read: " + filePaths);

      for (var i = 0; i < filePaths.length; i++) {
        parsers.push(parseFile(filePaths[i], log));
      }
      Promise.all(parsers)
        .then((nodes) => {
          nodes.map(node => tree.push(node));
          log.debug(`Parsed notes from ${tree.length} files.`);
          return tree;
        })
        .catch((error) => {
          handleError(error, true);
        });
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
  log.error(error);
  process.exitCode = 1;
  if (fatal) {
    process.exit(exitCode);
    help.printHelp();
  }
}
