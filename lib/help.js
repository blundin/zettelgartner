function printHelp() {
  const text = 'Usage: node main.js [options] [path to notes]\n\nOptions:\n' +
    '\t-h, --help\t\tDisplay this help text\n' +
    '\t-d, --debug\t\tEnable debug logging to the console.\n' +
    '\t-v, --verbose\t\tEnable verbose logging.'
  console.log(text);
}

exports.printHelp = printHelp;
