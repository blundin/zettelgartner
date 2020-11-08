const fs = require('fs');
const path = require('path');
const unified = require('unified');
const markdown = require('remark-parse');
const { wikiLinkPlugin } = require('remark-wiki-link');

const optionsParser = require('./lib/options.js');
const help = require('./lib/help.js');
const loggers = require('./lib/utils/loggers.js');
const errors = require('./lib/utils/errors.js');
const NoteFiles = require('./lib/notefiles.js');

const args = process.argv.slice(2);

if (args.length > 0) {
  const options = optionsParser.parse(args);
  const log = loggers.configureConsoleLogger(options);

  if (!options.help && !options.error) {
    log.info('Started processing notes in ' + options.directoryPath);

    NoteFiles.getFilenames(options.directoryPath, log)
      .then((fileNames) => {
        log.debug('File names read: ' + fileNames);

        const processor = unified()
          .use(markdown, { gfm: true })
          .use(wikiLinkPlugin);

        var notes = [];
        for (var i = 0; i < fileNames.length; i++) {
          const filePath = path.join(options.directoryPath + fileNames[i]);
          fs.readFile(filePath, 'utf8' , (err, data) => {
            if (err) {
              log.error(err);
            }
            var node = processor.parse(data)
            log.debug(JSON.stringify(node, null, 2));
            notes.push(node);
          });
        }
      });
  } else {
    if (options.error) {
      log.error(options.error);
      process.exitCode = 1;
    }
    help.printHelp();
  }
} else {
  const log = loggers.defaultLogger;
  log.error(errors.INVALID_DIRECTORY_PATH);
  help.printHelp();
  process.exitCode = 1;
}
