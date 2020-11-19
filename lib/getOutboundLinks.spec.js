const getOutboundLinks = require("./getOutboundLinks.js");
const sampleNotes = require("../test/fixtures/sampleNotes.js");
const Logger = require("./utils/logger.js");
const log = new Logger("info");

describe("getOutboundLinks()", () => {
  it("returns the right number of links.", async () => {
    const links = await getOutboundLinks(sampleNotes.validNoteTree, log);
    expect(links.length).toEqual(1);
  });

  it("returns the correct link.", async () => {
    const links = await getOutboundLinks(sampleNotes.validNoteTree, log);
    expect(links[0].value).toMatch("20201114103411 the link");
  });
});
