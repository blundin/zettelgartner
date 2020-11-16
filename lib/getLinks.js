const visit = require("unist-util-visit");
const log = require("winston");

async function getLinks(tree) {
  const links = [];

  visit(tree, "wikiLink", (node) => {
    links.push(node);
    logLinkDetails(node);
  });

  return links;
}

function logLinkDetails(node) {
  log.debug(`Link title: ${node.value}`);
  log.debug(`Link alias: ${node.data.alias}`);
  log.debug(`Permalink: ${node.data.permalink}`);
  log.debug(`Exists: ${node.data.exists}`);
  log.debug("-------------");
}

module.exports = getLinks;
