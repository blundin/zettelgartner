const getOutboundLinks = require("./get_outbound_links.js");
const validNoteTree = require("../test/fixtures/note_tree.js");
const Logger = require("./utils/logger.js");
const log = new Logger("info");

describe("getOutboundLinks()", () => {
  it("returns the right number of links.", async () => {
    const links = await getOutboundLinks(validNoteTree, log);
    expect(links.length).toEqual(1);
  });

  it("returns the correct link.", async () => {
    const links = await getOutboundLinks(validNoteTree, log);
    expect(links[0].text).toMatch("20201114103411 the link");
  });
});
