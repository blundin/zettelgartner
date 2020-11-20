const Link = require("./Link.js");

function getInboundLinks(currentNote, notesMap, log) {
  const links = [];
  log.debug("Looking for links to " + currentNote.title);
  notesMap.forEach(linkingNote => {
    if (currentNote.title !== linkingNote.title) {

      log.debug("Scanning " + linkingNote.title + " for links to " + currentNote.permalink);
      if (linkingNote.linksOut && linkingNote.linksOut.length > 0) {

        log.debug(linkingNote.title + " has " + linkingNote.linksOut.length + " outbound links");
        linkingNote.linksOut.forEach(linkNode => {

          log.debug(`${linkingNote.title} has a link to ${linkNode.value}`);
          if (linkNode.data.exists && linkNode.data.permalink === currentNote.permalink){
            log.debug("Matched link in " + linkingNote.title + " to " + currentNote.permalink);
            const link = Link({
              text: linkNode.value,
              alias: linkNode.data.alias,
              permalink: linkNode.data.permalink,
              inFilename: linkingNote.filename,
              context: ""
            });
            log.debug("Created link: " + link.text);
            links.push(link);
          }
        });
      } else {
        log.debug(linkingNote.title + " does not have outbound links");
      }
    } else {
      log.debug("Skipped scanning note for self-links");
    }
  });
  log.debug("-----------------------");
  return links;
}

module.exports = getInboundLinks;
