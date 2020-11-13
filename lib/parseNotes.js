const fs = require("fs");
const path = require("path");
const unified = require("unified");
const markdown = require("remark-parse");
const { wikiLinkPlugin } = require("remark-wiki-link");

let log;

async function parseNotes(directoryPath, logger) {
  log = logger;
  let fileParsers = new Map();
  const files = await getFilenames(directoryPath, log);
  log.debug(files);
  files.map((filename) => {
    fileParsers.set(filename, getFileParser(path.resolve(directoryPath, filename)));
  });

  log.debug("Number of file parsers: " + fileParsers.size);
  return await buildSyntaxTrees(fileParsers);
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

function getFileParser(filePath) {
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

async function buildSyntaxTrees(parserMap) {
  let treeMap = new Map();
  let promises = [];

  parserMap.forEach((parser, filename) => {
    promises.push(parser);
    parser.then(treeNode => {
      treeMap.set(filename, treeNode);
    })
  });

  await Promise.all(promises);

  // treeMap.forEach((node, filename) => {
  //   log.debug("Parsed file: " + filename);
  //   log.debug("Parsed node: " + node);
  // });
  
  return treeMap;
}

module.exports = parseNotes;
