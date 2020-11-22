const fs = require("fs");
const errors = require("./utils/errors.js");

const defaultOptions = {
  directoryPath: "",
  debug: false,
  help: false,
  verbose: false
};

function parse(args) {
  const options = defaultOptions;

  for (var i = 0; i < args.length; i++) {
    switch (args[i]) {
      case (args[i] === "-d" || args[i] === "--debug"):
        options.debug = true;
        break;
      case (args[i] === "-v" || args[i] === "--verbose"):
        options.verbose = true;
        break;
      case (args[i] === "-h" || args[i] === "--help"):
        options.help = true;
        break;
      case (args[i][0] === "-"):
        options.error = errors.INVALID_OPTION;
        break;
      default:
        try {
          options.directoryPath = validateDirectory(args[i]);
        } catch(error) {
          options.error = errors.INVALID_DIRECTORY_PATH;
        }
        break;
    }
  }
  return options;
}

function validateDirectory(pathInput) {
  const exists = fs.existsSync(pathInput);
  const isDirectory = fs.lstatSync(pathInput).isDirectory();

  let validatedPath;
  if (exists && isDirectory) {
    if (!pathInput.endsWith("/") && pathInput.length > 1) {
      validatedPath = pathInput + "/";
    } else {
      validatedPath = pathInput;
    }
  } else {
    throw errors.INVALID_DIRECTORY_PATH
  }
  return validatedPath;
}

exports.parse = parse;
