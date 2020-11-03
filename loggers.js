const winston = require("winston");

const console = new winston.transports.Console({ level: "info" });

exports.console = console;
