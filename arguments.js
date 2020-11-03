const parse = function(args) {
  var options;
  var directoryPath = "";
  var debug = false;
  var verbose = false;
  var help = false;

  for (i = 0; i < args.length; i++) {
    if (args[i] == "-d" || args[i] == "--debug") {
      debug = true;
    } else if (args[i] == "-v" || args[i] == "--verbose") {
      verbose = true;
    } else if (args[i] == "-h" || args[i] == "--help") {
      help = true
      printHelp();
    } else {
      if (directoryPath == "") {
        directoryPath = args[i];
      }
    }
  }

  options = {
      directoryPath: directoryPath,
      debug: debug,
      verbose: verbose,
      help: help
  };

  return options;
}

function printHelp() {
  const text = "Usage: node main.js [options] [path to notes]\n\nOptions:\n" +
    "\t-h, --help\t\tDisplay this help text\n" +
    "\t-d, --debug\t\tEnable debug logging to the console.\n" +
    "\t-v, --verbose\t\tEnable verbose logging."
  console.log(text);
}

exports.parse = parse;
exports.printHelp = printHelp;
