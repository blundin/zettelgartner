const fs = require("fs");
const path = require("path");
const unified = require("unified");
const markdown = require("remark-parse");
const { wikiLinkPlugin } = require("remark-wiki-link");
const find = require("unist-util-find");
const Note = require("./note.js");
const getOutboundLinks = require("./get_outbound_links.js");
const getInboundLinks = require("./get_inbound_links.js");

let log;

async function parseNotes(directoryPath, logger) {
  log = logger;
  let fileParsers = new Map();

  const files = await getFilenames(directoryPath, log);
  log.debug("Found files: " + files);

  const permalinks = files.map(file => {
    return file.replace(/\.[^/.]+$/, "");
  });
  log.debug("Permalinks: " + permalinks);

  files.forEach(filename => {
    fileParsers.set(filename, getFileParser(path.resolve(directoryPath, filename), permalinks));
  });

  log.debug("Number of file parsers: " + fileParsers.size);
  const notesMap = await buildNotesMap(fileParsers);
  notesMap.forEach(note => {
    const linksIn = getInboundLinks(note, notesMap, log);
    note.linksIn = linksIn;
  });

  return notesMap;
}

function getFilenames(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (error, filenames) => {
      if (error) {
        reject(error);
      } else {
        filenames = filenames.filter(file => {
          return path.extname(file).toLowerCase() === ".md";
        });
        resolve(filenames);
      }
    });
  });
}

function getFileParser(filePath, permalinks) {
  const identity = (name) => [name];
  const processor = unified()
    .use(markdown)
    .use(wikiLinkPlugin, {
      pageResolver: identity,
      permalinks: permalinks
    });

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8" , (error, data) => {
      if (error) {
        reject(error);
      }
      const node = processor.parse(data);
      resolve(node);
    });
  });
}

async function buildNotesMap(parserMap) {
  const notesMap = new Map();
  const promises = [];

  parserMap.forEach((parser, filename) => {
    promises.push(parser);
    parser.then(async (tree) => {
      const titleNode = find(tree, { type: "heading", depth: 1 });
      const title = find(titleNode, { type: "text" }).value;
      const linksOut = await getOutboundLinks(tree, log);
      const note = Note({
        title: title,
        permalink: filename.replace(/\.[^/.]+$/, ""),
        filename: filename,
        linksOut: linksOut,
        linksIn: [],
        tree: tree
      });
      notesMap.set(filename, note);
    });
  });

  await Promise.all(promises);

  return notesMap;
}

module.exports = parseNotes;
