const Logger = require("./utils/logger.js");
const log = new Logger("debug");
const notesMap = require("../test/fixtures/notesMap.js");

const getInboundLinks = require("./getInboundLinks.js");
const singleNote = notesMap.get("202010301717 William James.md");

describe("getInboundLinks()", () => {
  it("returns an array of the right size", () => {
    const links = getInboundLinks(
      singleNote,
      notesMap,
      log);
    console.log(links);
    expect(links.length).toEqual(1);
  });

  it("returns an array of properly formed links", () => {
    const links = getInboundLinks(singleNote, notesMap, log);
    expect(links.length).toBeGreaterThan(0);
    links.forEach(link => {
      expect(link).toBeDefined();
      expect(link.data).toBeDefined();
    });

  });
});
