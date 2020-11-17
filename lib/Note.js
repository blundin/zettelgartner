function Note(spec) {
  let { title, permalink, filename, links, content, tree } = spec;
  return Object.freeze({
    title,
    permalink,
    filename,
    links,
    content,
    tree
  });
}

module.exports = Note;
