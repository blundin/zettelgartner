const fs = require("fs");
const errors = require("./utils/errors.js");

function parse(args) {
  const options = {
    directoryPath: "",
    debug: false,
    help: false,
    verbose: false
  };

  for (var i = 0; i < args.length; i++) {
    if (args[i] === "-d" || args[i] === "--debug") {
      options.debug = true;
    } else if (args[i] === "-v" || args[i] === "--verbose") {
      options.verbose = true;
    } else if (args[i] === "-h" || args[i] === "--help") {
      options.help = true;
    } else if (args[i][0] === "-") {
      options.error = errors.INVALID_OPTION;
    } else {
      try {
        options.directoryPath = validateDirectory(args[i]);
      } catch(error) {
        options.error = errors.INVALID_DIRECTORY_PATH;
      }
    }
  }
  return options;
}

function validateDirectory(pathInput) {
  const validatedPath = !pathInput.endsWith("/") ? pathInput + "/" : pathInput;

  if (fs.lstatSync(pathInput).isDirectory()) {
    return validatedPath;
  } else {
    throw errors.INVALID_DIRECTORY_PATH
  }
}

exports.parse = parse;
