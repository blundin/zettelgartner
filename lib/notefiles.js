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

function parseFile(filePath) {
  const processor = unified()
    .use(markdown)
    .use(wikiLinkPlugin);

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8" , (error, data) => {
      if (error) {
        reject(error);
      }
      var node = processor.parse(data);
      resolve(node);
    });
  });
}

exports.getFilenames = getFilenames;
exports.parseFile = parseFile;
