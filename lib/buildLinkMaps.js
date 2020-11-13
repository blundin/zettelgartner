let unified = require("unified");
let parse = require("remark-parse");
let visit = require("unist-util-visit");

async function buildLinkMaps(trees, log) {
  let linkMap = new Map();
  for (const noteTree of trees) {
    // for every note file
    visit(noteTree, 'wikiLink', (node) => {
      console.log(`Link title: ${node.value}`);
    });
  }
  return linkMap;
}

module.exports = buildLinkMaps;
