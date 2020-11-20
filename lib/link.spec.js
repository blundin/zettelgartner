const Link = require("./link.js");

const testLink = {
  text: "123456 Link to note",
  alias: "123456 Link to note",
  permalink: "123456 Link to note",
  destinationExists: true,
  inFilename: "789012 another note.md",
  context: "Fake context"
};

describe("Note", () => {
  it("creates a Note with all properties", () => {
    const link = Link(testLink);
    expect(link).toBeDefined();
    expect(link.text).toMatch(testLink.text);
    expect(link.destinationExists).toBeTruthy();
  });
});
