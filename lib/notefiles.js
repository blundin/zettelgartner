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


      let parsers = [];
      let tree = [];
      for (var i = 0; i < filePaths.length; i++) {
        parsers.push(parseFile(filePaths[i], log));
      }
      Promise.all(parsers)
        .then((nodes) => {
          nodes.map(node => tree.push(node));

          log.debug(`Parsed notes from ${tree.length} files.`);
          return tree;
        });
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
      resolve(node);
    });
  });
}

exports.parse = parse;
