const Note = require("./note.js");
const sampleNotes = require("../test/fixtures/sample_notes.js");

describe("Note", () => {
  it("creates a Note with all properties", () => {
    const note = Note(sampleNotes.validNote);
    expect(note).toBeDefined();
    expect(note.title).toMatch(sampleNotes.validNote.title);
  });
});
