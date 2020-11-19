function Link(spec) {
  let { text, alias, permalink, inFilename, context } = spec;
  return Object.seal({
    text,
    alias,
    permalink,
    inFilename,
    context
  });
}

module.exports = Link;
