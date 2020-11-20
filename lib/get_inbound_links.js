const Link = require("./link.js");

function getInboundLinks(currentNote, notesMap, log) {
  const links = [];
  log.debug("Looking for links to " + currentNote.title);
  notesMap.forEach(linkingNote => {
    if (currentNote.title !== linkingNote.title) {

      log.debug("Scanning " + linkingNote.title + " for links to " + currentNote.permalink);
      if (linkingNote.linksOut && linkingNote.linksOut.length > 0) {

        log.debug(linkingNote.title + " has " + linkingNote.linksOut.length + " outbound links");
        linkingNote.linksOut.forEach(linkOut => {

          log.debug(`${linkingNote.title} has a link to ${linkOut.text}`);
          if (linkOut.destinationExists && linkOut.permalink === currentNote.permalink){
            log.debug("Matched link in " + linkingNote.title + " to " + currentNote.permalink);
            const link = Link({
              text: linkOut.text,
              alias: linkOut.alias,
              permalink: linkOut.permalink,
              destinationExists: true,
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
