const fs = require("fs");
const path = require("path");
const unified = require("unified");
const markdown = require("remark-parse");
const { wikiLinkPlugin } = require("remark-wiki-link");

async function parse(directoryPath, log) {
  let files = [];
  let parsers = [];
  let tree = [];

  log.debug("Directory path is: " + directoryPath);

  files = await getFilenames(directoryPath);

  const filePaths = files.map(fileName => path.join(directoryPath, fileName));
  log.debug("File names read: " + filePaths);

  for (var i = 0; i < filePaths.length; i++) {
    parsers.push(parseFile(filePaths[i], log));
  }
  return Promise.all(parsers)
    .then((nodes) => {
      nodes.map(node => tree.push(node));
      log.debug(`Parsed notes from ${tree.length} files.`);
      return tree;
    })
    .catch((error) => {
      log.error(error);
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
