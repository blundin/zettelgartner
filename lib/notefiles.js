const fs = require("fs");
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

async function buildNoteSyntaxTrees(noteParsers) {
  let trees = [];

  console.log(noteParsers);

  await Promise.all(noteParsers)
    .then((nodes) => {
      nodes.map(node => trees.push(node));
    });
    // .catch((error) => {
    //   reject(error);
    // });
    return trees;
}

exports.getFilenames = getFilenames;
exports.parseFile = parseFile;
exports.buildNoteSyntaxTrees = buildNoteSyntaxTrees;
