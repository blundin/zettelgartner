const Logger = require("./utils/logger.js");
const log = new Logger("info");
const notesMap = require("../test/fixtures/notesMap.js");

const buildLinkMap = require("./buildLinkMap.js");

describe("buildLinkMap()", () => {
  it("returns a map of the right size", async () => {
    const linkMap = await buildLinkMap(notesMap, log);
    expect(linkMap.size).toEqual(3);
  });

  it("returns a map  of properly formed note items", async () => {
    const linkMap = await buildLinkMap(notesMap, log);
    console.log(linkMap);
  });
});
