const parseNotes = require("./parse_notes.js");
const { countFiles } = require("../test/file_utils.js");
const Logger = require("./utils/logger.js");
const log = new Logger("info");

const directoryPath = "./test/test_notes/";
const invalidDirectoryPath = "x";
const fileCount = countFiles(directoryPath);

describe("notefiles.js", () => {
  describe("parseNotes()", () => {
    it("should read the correct number of files from a valid directory", () => {
      expect.assertions(1);
      return parseNotes(directoryPath, log)
        .then(treeMap => {
          // expect one less file to test non-markdown file filtering
          expect(treeMap.size).toEqual(fileCount - 1);
        });
    });

    it("should reject an invalid directory", () => {
      expect.assertions(1);
      return parseNotes(invalidDirectoryPath, log)
        .catch(error => {
          expect(error).toBeDefined();
        });
    });
  });
});
