function buildLinkMap(notesMap) {
  const linkMap = new Map();

  console.log("Notes in notesMap: " + notesMap.size);
  notesMap.forEach(currentNote => {
    const linksToCurrentNote = [];
    notesMap.forEach(linkingNote => {
      if (linkingNote !== currentNote) {
        linkingNote.links.forEach(link => {
          if (link.data.permalink === currentNote.permalink) {
            linksToCurrentNote.push(link);
          }
        });
      }
    });
    linkMap.set(currentNote.permalink, linksToCurrentNote);
  });
  return linkMap;
}

module.exports = buildLinkMap;
