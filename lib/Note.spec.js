const Note = require("./Note.js");
const sampleNotes = require("../test/fixtures/sampleNotes.js");

describe("Note", () => {
  it("creates a Note with all properties", () => {
    const note = Note(sampleNotes.validNote);
    expect(note).toBeDefined();
    expect(note.title).toMatch(sampleNotes.validNote.title);
  });
});
