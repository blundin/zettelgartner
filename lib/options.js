const fs = require('fs');

const parse = function(args) {
  var directoryPath = '';
  var debug = false;
  var verbose = false;
  var help = false;
  var invalidPath = false;
  var invalidOption = false;

  for (i = 0; i < args.length; i++) {
    if (args[i] == '-d' || args[i] == '--debug') {
      debug = true;
    } else if (args[i] == '-v' || args[i] == '--verbose') {
      verbose = true;
    } else if (args[i] == '-h' || args[i] == '--help') {
      help = true;
    } else if (args[i][0] == '-') {
      invalidOption = true;
    } else {
      // check for valid folder path
      try {
        const exists = fs.existsSync(args[i]);
        const isDirectory = fs.lstatSync(args[i]).isDirectory();
        if (exists && isDirectory) {
          directoryPath = args[i];
        }
      } catch(error) {
        invalidPath = true;
      }
    }
  }

  return {
      directoryPath: directoryPath,
      debug: debug,
      verbose: verbose,
      help: help,
      invalidPath: invalidPath,
      invalidOption: invalidOption
  };
}

exports.parse = parse;