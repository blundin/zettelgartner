const fs = require("fs").promises;
const loggers = require("./loggers.js")
const errors = require("./errors.js");

const args = process.argv.slice(2);

var directoryPath = "";
var debug = false;
var verbose = false;
var help = false;

if (args.length > 0 && args[0] != undefined) {
  for (i = 0; i < args.length; i++) {
    if (args[i] == "-d" || args[i] == "--debug") {
      debug = true;
      console.info("debug = true");
    } else if (args[i] == "-v" || args[i] == "--verbose") {
      verbose = true;
      console.info("verbose = true");
    } else if (args[i] == "-h" || args[i] == "--help") {
      help = true;
      console.info("help = true");
    } else {
      if (directoryPath == "") {

      }
    }
  }

  if (help == true) {
    // print out help info
  } else {
    const options = {
        directoryPath: directoryPath,
        debug: debug,
        verbose: verbose
    };

    const console = loggers.configureConsoleLogger(options);
    console.debug("debug logging is on.");
    console.verbose("verbose logging is on.");
  }
} else {
  const console = loggers.console;
  console.error(errors.INVALID_DIRECTORY_PATH);
  process.exitCode = 1;
}
