const fs = require("fs");
const path = require("path");
const unified = require("unified");
const markdown = require("remark-parse");
const { wikiLinkPlugin } = require("remark-wiki-link");

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

function parseFiles(directoryPath) {
  getFilenames(directoryPath)
    .then((fileNames) => {
      const filePaths = fileNames.map(fileName => directoryPath + fileName);

      return new Promise((resolve, reject) => {
        const processor = unified()
          .use(markdown)
          .use(wikiLinkPlugin);

        log.debug("File names read: " + filePaths);

        var notes = [];
        for (var i = 0; i < filePaths.length; i++) {
          fs.readFile(filePaths[i], "utf8" , (err, data) => {
            if (err) {
              log.error(err);
            }
            var node = processor.parse(data)
            log.debug(JSON.stringify(node, null, 2));
            notes.push(node);
          });
        }
        resolve(notes);
      });
    })
    .catch((error) => {
      reject(error);
    });
}

exports.getFilenames = getFilenames;
exports.parseFiles = parseFiles;
