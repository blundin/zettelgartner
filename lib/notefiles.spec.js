const NoteFiles = require("./notefiles.js");
const { countFiles } = require("../test/fileUtils.js");
const Logger = require("./utils/logger.js");
const log = new Logger("debug");

const directoryPath = "./test/test_data/";
const invalidPath = "x";
const fileCount = countFiles(directoryPath);

describe("Read file names from directory", () => {
  it("should read the correct number of files from a valid directory", () => {
    const tree = NoteFiles.parse(directoryPath, log);
    log.debug(tree);
    expect(tree.length).toEqual(fileCount);
  });

  // it("should reject an invalid directory", () => {
  //   expect.assertions(1);
  //   return NoteFiles.parse(invalidPath)
  //     .catch((error) => expect(error).toBeDefined());
  // });
});
