const Note = require("./note.js");
const notesMap = require("../test/fixtures/notes_map.js");
const singleNote = notesMap.get("202010301717 William James.md");

describe("Note", () => {
  it("creates a Note with all properties", () => {
    const note = Note(singleNote);
    expect(note).toBeDefined();
    expect(note.title).toMatch(singleNote.title);
  });
});
