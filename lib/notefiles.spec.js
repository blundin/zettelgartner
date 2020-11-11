const NoteFiles = require("./notefiles.js");
const { countFiles } = require("../test/fileUtils.js");
const Logger = require("./utils/logger.js");
const log = new Logger("info");

const directoryPath = "./test/test_data/";
const invalidPath = "x";
const fileCount = countFiles(directoryPath);

describe("notefiles.js", () => {
  describe("NoteFiles.getFilenames()", () => {
    it("should read the correct number of files from a valid directory", () => {
      expect.assertions(1);
      return NoteFiles.getFilenames(directoryPath, log)
        .then(tree => {
          expect(tree.length).toEqual(fileCount);
        });
    });

    it("should reject an invalid directory", () => {
      expect.assertions(1);
      return NoteFiles.getFilenames(invalidPath, log)
        .catch(error => {
          expect(error).toBeDefined();
        });
    });
  });

  describe("NoteFiles.parseFile()", () => {
    const validFilePath = "./test/test_data/202010301717 William James.md";
    const invalidFilePath = "./test/test_data/xxx.md"
    it("should parse a file", () => {
      return NoteFiles.parseFile(validFilePath, log)
        .then(node => {
          expect(node).toBeDefined();
        });
    });

    it("should reject an invalid file path", () => {
      expect.assertions(1);
      return NoteFiles.parseFile(invalidFilePath, log)
        .catch(error => {
          expect(error).toBeDefined();
        });
    });
  });
});
