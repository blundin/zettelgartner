const fs = require("fs");
const path = require("path");
const unified = require("unified");
const markdown = require("remark-parse");
const { wikiLinkPlugin } = require("remark-wiki-link");

function parse(directoryPath, log) {
  getFilenames(directoryPath)
    .then((fileNames) => {
      const filePaths = fileNames.map(fileName => path.join(directoryPath, fileName));
      log.debug("File names read: " + filePaths);

      var notes = [];
      for (var i = 0; i < filePaths.length; i++) {
        parseFile(filePaths[i], log)
          .then((noteData) => {
            notes.push(noteData);
          });
      }
      return notes;
    });
}

function getFilenames(directoryPath) {
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

function parseFile(filePath, log) {
  const processor = unified()
    .use(markdown)
    .use(wikiLinkPlugin);

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8" , (error, data) => {
      if (error) {
        log.error(error);
        reject(error);
      }
      var node = processor.parse(data);
      log.debug(node);
      resolve(node);
    });
  });
}

exports.parse = parse;
