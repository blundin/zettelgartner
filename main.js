// Modules
const fs = require("fs");

// Configuration
const errors = require("./errors.js");
const args = process.argv.slice(2);

if (args.length >= 1) {
  console.log(args[0]);
} else {
  if (args.length == 0) {
    console.log(errors.INVALID_DIRECTORY_PATH);
    process.exitCode = 1;
  }
}
