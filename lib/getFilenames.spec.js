const { getFilenames } = require('./getFilenames');
const { countFiles } = require('../test/fileUtils.js');

const directoryPath = './test/test_data/';
const invalidPath = 'x';
const fileCount = countFiles(directoryPath);

describe('Read file names from directory', () => {
  it('should read the correct number of files from a valid directory', () => {
    return getFilenames(directoryPath)
      .then(files => {
        expect(files.length).toEqual(fileCount);
      });
  });

  it('should reject an invalid directory', () => {
    expect.assertions(1);
    return getFilenames(invalidPath)
      .catch((error) => expect(error).toBeDefined());
  });
});
