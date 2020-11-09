const fs = require("fs");
const errors = require("./utils/errors.js");

const parse = function(args) {
  const options = {
    directoryPath: "",
    debug: false,
    help: false,
    verbose: false
  }

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
        var pathInput = args[i];
        const exists = fs.existsSync(pathInput);
        const isDirectory = fs.lstatSync(pathInput).isDirectory();

        if (exists && isDirectory) {
          if (!pathInput.endsWith("/") && pathInput.length > 1) {
            pathInput = pathInput + "/";
          }

          options.directoryPath = pathInput;
        } else {
          options.error = errors.INVALID_DIRECTORY_PATH;
        }
      } catch(error) {
        options.error = errors.INVALID_DIRECTORY_PATH;
      }
    }
  }
  return options;
}

exports.parse = parse;
