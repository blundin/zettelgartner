module.exports = {
  automock: false,
  verbose: true,
  collectCoverage: true,
  coverageReporters: ["html", "text", "json"],
  setupFiles: ["<rootDir>/test/setup.js"]
};
