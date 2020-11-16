function Note(spec) {
  let { title, links, content, tree } = spec;
  return Object.freeze({
    title,
    links,
    content,
    tree
  });
}

module.exports = Note;
