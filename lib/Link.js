function Link(spec) {
  let {
    text,
    alias,
    permalink,
    destinationExists,
    inFilename,
    context } = spec;

  return Object.seal({
    text,
    alias,
    permalink,
    destinationExists,
    inFilename,
    context
  });
}

module.exports = Link;
