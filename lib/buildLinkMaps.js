let visit = require("unist-util-visit");

async function buildLinkMaps(treeMap, log) {
  const linkMap = new Map();
  const permalinks = [];

  for (const [file, tree] of treeMap) {
    const page = file.replace(/\.[^/.]+$/, "");
    log.debug("Page: " + page);
    permalinks.push(page);
    visit(tree, "wikiLink", (node) => {
      linkMap.set(page, node);
      logLinkDetails(page, node, log);
    });
  }
  return [ linkMap, permalinks ];
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
