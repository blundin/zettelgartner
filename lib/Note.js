function Note(spec) {
  let { title, permalink, filename, linksOut, linksIn, content, tree } = spec;
  return Object.freeze({
    title,
    permalink,
    filename,
    linksOut,
    linksIn,
    content,
    tree
  });
}

module.exports = Note;
