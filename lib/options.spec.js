const options = require("./options.js");
const errors = require("./utils/errors.js");

const testOptions = {
    all_short_options: ["-d", "-v", "-h"],
    short_help: ["-h"],
    short_verbose: ["-v"],
    short_debug: ["-d"],
    all_long_options: ["--help", "--verbose", "--debug"],
    long_help: ["--help"],
    long_verbose: ["--verbose"],
    long_debug: ["--debug"],
    invalid_option: ["-x"]
};

const validPath = ["./test/test_notes/"];
const filePath = ["./test/test_notes/test.md"];
const invalidPath = ["x"];

describe("options.js", () => {
  describe("options.parse()", () => {
    describe("Command line options", () => {
      describe("Help", () => {});

      describe("All short options", () => {
        it("should return 'true' for help and other options", async () => {
          const result = options.parse(testOptions["all_short_options"]);
          expect(result.debug).toBe(true);
          expect(result.verbose).toBe(true);
          expect(result.error).toBeUndefined();
        });
      });

      describe("All long options", () => {
        it("should read all of the indiviudal options correctly", async () => {
          const result = options.parse(testOptions["all_long_options"]);
          expect(result.debug).toBe(true);
          expect(result.verbose).toBe(true);
          expect(result.error).toBeUndefined();
        });
      });

      describe("Invaild option", () => {
        it("should detect an invalid option", async () => {
          const result = options.parse(testOptions["invalid_option"]);
          expect(result.debug).toBe(false);
          expect(result.verbose).toBe(false);
          expect(result.error).not.toBeUndefined();
        });
      });
    });

    describe("Path to notes", () => {
      describe("Valid paths", () => {
        it("should validate folder path", async () => {
          const result = options.parse(validPath);
          console.log(result);
          expect(result.directoryPath).toMatch(validPath[0]);
          expect(result.error).toBeUndefined();
        });
      });

      describe("Invalid paths", () => {
        it("should detect an invalid directory path", async () => {
          const result = options.parse(invalidPath);
          expect(result.error).toMatch(errors.INVALID_DIRECTORY_PATH);
        });

        it("should detect a file path instead of a directory path", () => {
          const result = options.parse(filePath);
          expect(result.error).toMatch(errors.INVALID_DIRECTORY_PATH);
        });

        it("should add a '/' to the end of the path if missing", () => {
          const alteredPath = validPath[0].substring(0, validPath[0].length - 1);
          const result = options.parse([alteredPath]);
          expect(result.directoryPath.endsWith("/")).toBe(true);
        });
      });
    });
  });
});
