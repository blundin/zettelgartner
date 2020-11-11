const NoteFiles = require("./notefiles.js");
const { countFiles } = require("../test/fileUtils.js");
const Logger = require("./utils/logger.js");
const log = new Logger("info");

const directoryPath = "./test/test_data/";
const invalidPath = "x";
const fileCount = countFiles(directoryPath);

describe("Read file names from directory", () => {
  it("should read the correct number of files from a valid directory", () => {
    expect.assertions(1);
    return NoteFiles.parse(directoryPath, log)
      .then(tree => {
        expect(tree.length).toEqual(fileCount);
      });
  });

  it("should reject an invalid directory", () => {
    expect.assertions(1);
    return NoteFiles.parse(invalidPath, log)
      .catch(error => {
        expect(error).toBeDefined();
      });
  });
});

describe("Parse markdown trees from files", () => {
  it("should parse a file", () => {
    return NoteFiles.parseFile(filePaths[i], log);
  });
});
