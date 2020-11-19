const visit = require("unist-util-visit");

async function getOutboundLinks(tree, log) {
  const links = [];

  visit(tree, "wikiLink", (node) => {
    links.push(node);
    // logLinkDetails(node, log);
  });

  return links;
}

function logLinkDetails(node, log) {
  log.debug(`Link title: ${node.value}`);
  log.debug(`Link alias: ${node.data.alias}`);
  log.debug(`Permalink: ${node.data.permalink}`);
  log.debug(`Exists: ${node.data.exists}`);
  log.debug("-------------");
}

module.exports = getOutboundLinks;
