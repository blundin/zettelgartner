const fs = require("fs");

function countFiles(directoryPath) {
  return fs.readdirSync(directoryPath).length;
}

exports.countFiles = countFiles;
