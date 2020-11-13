const fs = require("fs");
const path = require("path");
const unified = require("unified");
const markdown = require("remark-parse");
const { wikiLinkPlugin } = require("remark-wiki-link");

async function parseNotes(directoryPath, log) {
  let fileParsers = new Map();
  const files = await getFilenames(directoryPath, log);
  files.map((filename) => {
    fileParsers.set(filename, getFileParser(path.resolve(directoryPath, filename), log));
  });

  const trees = await buildSyntaxTrees(fileParsers);
  return trees;
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

async function buildSyntaxTrees(noteParsers) {
  let treeMap = new Map();

  await Promise.all(noteParsers)
    .then(nodes => {
      nodes.map(node => trees.push(node));
    })
    .catch(error => {
      throw(error);
    });
  return trees;
}

module.exports = parseNotes;
