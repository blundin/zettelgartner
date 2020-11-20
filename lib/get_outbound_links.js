const visit = require("unist-util-visit");
const Link = require("./link.js");

async function getOutboundLinks(tree, log) {
  const links = [];

  visit(tree, "wikiLink", (node) => {
    logLinkDetails(node, log);
    const link = Link({
      text: node.value,
      alias: node.data.alias,
      permalink: node.data.permalink,
      destinationExists: node.data.exists,
      inFilename: node.filename,
      context: ""
    });
    links.push(link);
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
