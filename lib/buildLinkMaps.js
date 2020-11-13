// let unified = require("unified");
// let parse = require("remark-parse");
let visit = require("unist-util-visit");
// let visitChildren = require("unist-util-visit-children");

async function buildLinkMaps(treeMap, log) {
  const linkMap = new Map();
  const permalinks = [];

  for (const [file, tree] of treeMap) {
    // for every note file
    visit(tree, "wikiLink", (node) => {
      logLinkDetails(file, node, log);
    });
  }
  return linkMap;
}

function logLinkDetails(file, node, log) {
  log.verbose(`Note file: ${file}`);
  log.verbose(`Link title: ${node.value}`);
  log.verbose(`Link alias: ${node.data.alias}`);
  log.verbose(`Permalink: ${node.data.permalink}`);
  log.verbose(`Exists: ${node.data.exists}`);
  log.verbose("-------------");
}

module.exports = buildLinkMaps;
