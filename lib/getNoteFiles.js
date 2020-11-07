const fs = require('fs');
const path = require('path');

function getNoteFiles(directoryPath, log) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (error, fileNames) => {
      if (error) {
        reject(error);
      } else {
        resolve(fileNames);
      }
    });
  });
}

exports.getNoteFiles = getNoteFiles;
