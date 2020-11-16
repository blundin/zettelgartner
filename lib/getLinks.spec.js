const getLinks = require("./getLinks.js");
const sampleNotes = require("../test/fixtures/sampleNotes.js");
const Logger = require("./utils/logger.js");
const log = new Logger("info");

describe("getLinks()", () => {
  it("returns the right number of links.", async () => {
    const links = await getLinks(sampleNotes.validNoteTree, log);
    expect(links.length).toEqual(1);
  });

  it("returns the correct link.", async () => {
    const links = await getLinks(sampleNotes.validNoteTree, log);
    expect(links[0].value).toMatch("20201114103411 the link");
  });
});
