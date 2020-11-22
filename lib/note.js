function Note(spec) {
  let { title,
    permalink,
    filename,
    linksOut,
    linksIn,
    content,
    tree } = spec;

  return Object.seal({
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
