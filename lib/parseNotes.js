const fs = require("fs");
const path = require("path");
const unified = require("unified");
const markdown = require("remark-parse");
const { wikiLinkPlugin } = require("remark-wiki-link");

async function parseNotes(directoryPath, log) {
  let fileParsers = [];
  const files = await getFilenames(directoryPath, log);
  const filePaths = files.map(filename => path.resolve(directoryPath, filename));

  for (let i = 0; i < filePaths.length; i++) {
    fileParsers.push(parseFile(filePaths[i], log));
  }

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

async function buildSyntaxTrees(noteParsers) {
  let trees = [];
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
