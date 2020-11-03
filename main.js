const fs = require("fs");
const loggers = require("./loggers.js")
const errors = require("./errors.js");

const args = process.argv.slice(2);

if (args.length > 0 && args[0] != undefined) {
  for (i = 0; i < args.length; i++) {
    console.log(args[i]);
  }
} else {
  console.log("ERROR: " + errors.INVALID_DIRECTORY_PATH);
  process.exitCode = 1;
}
