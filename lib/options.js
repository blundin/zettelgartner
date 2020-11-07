const fs = require('fs');

const parse = function(args) {
  var directoryPath = '';
  var debug = false;
  var verbose = false;
  var help = false;
  var invalidPath = false;
  var invalidOption = false;

  for (var i = 0; i < args.length; i++) {
    if (args[i] === '-d' || args[i] === '--debug') {
      debug = true;
    } else if (args[i] === '-v' || args[i] === '--verbose') {
      verbose = true;
    } else if (args[i] === '-h' || args[i] === '--help') {
      help = true;
    } else if (args[i][0] === '-') {
      invalidOption = true;
    } else {
      try {
        var pathInput = args[i];
        const exists = fs.existsSync(pathInput);
        const isDirectory = fs.lstatSync(pathInput).isDirectory();

        if (exists && isDirectory) {
          if (!pathInput.endsWith('/') && pathInput.length > 1) {
            pathInput = pathInput + '/';
          }

          directoryPath = pathInput;
        } else {
          invalidPath = true;
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
