const Logger = require("./logger.js");

describe("logger.js", () => {
  it("creates a logger with the correct log level", () => {
    const level = "info";
    const log = new Logger(level);
    expect(log.level).toMatch(level);
  });

  it("defaults to 'info' when passed an invalid log level string", () => {
    const level = "junk";
    const log = new Logger(level);
    expect(log.level).not.toMatch(level);
    expect(log.level).toMatch("info");
  });
});
