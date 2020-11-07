const options = require('./options.js');
// jest.(options);

const testOptions = {
    all_short_options: ['-d', '-v', '-h'],
    short_help: ['-h'],
    short_verbose: ['-v'],
    short_debug: ['-d'],
    all_long_options: ['--help', '--verbose', '--debug'],
    long_help: ['--help'],
    long_verbose: ['--verbose'],
    long_debug: ['--debug'],
    invalid_option: ['-x']
};

const validPath = ['./test/test_data/'];
const filePath = ['./test/test_data/test.md'];
const invalidPath = ['x'];

describe('Command line options', () => {
  describe('Help', () => {
    it('should return "true" for help', async () => {
      const result = options.parse(testOptions['short_help']);
      expect(result.help).toBe(true);
      expect(result.invalidPath).toBe(false);
      expect(result.invalidOption).toBe(false);
    });
  });

  describe('All short options', () => {
    it('should return "true" for help and other options', async () => {
      const result = options.parse(testOptions['all_short_options']);
      expect(result.help).toBe(true);
      expect(result.debug).toBe(true);
      expect(result.verbose).toBe(true);
      expect(result.invalidPath).toBe(false);
      expect(result.invalidOption).toBe(false);
    });
  });

  describe('All long options', () => {
    it('should read all of the indiviudal options correctly', async () => {
      const result = options.parse(testOptions['all_long_options']);
      expect(result.help).toBe(true);
      expect(result.debug).toBe(true);
      expect(result.verbose).toBe(true);
      expect(result.invalidPath).toBe(false);
      expect(result.invalidOption).toBe(false);
    });
  });

  describe('Invaild option', () => {
    it('should detect an invalid option', async () => {
      const result = options.parse(testOptions['invalid_option']);
      expect(result.help).toBe(false);
      expect(result.debug).toBe(false);
      expect(result.verbose).toBe(false);
      expect(result.invalidPath).toBe(false);
      expect(result.invalidOption).toBe(true);
    });
  });
});

describe('Path to notes', () => {
  describe('Valid paths', () => {
    it('should validate folder path', async () => {
      const result = options.parse(validPath);
      expect(result.directoryPath).toMatch(validPath[0]);
      expect(result.invalidPath).toBe(false);
      expect(result.invalidOption).toBe(false);
    });
  });

  describe('Invalid paths', () => {
    it('should detect an invalid directory path', async () => {
      const result = options.parse(invalidPath);
      expect(result.invalidPath).toBe(true);
      expect(result.invalidOption).toBe(false);
    });

    it('should detect a file path instead of a directory path', () => {
      const result = options.parse(filePath);
      expect(result.invalidPath).toBe(true);
      expect(result.invalidOption).toBe(false);
    });

    it('should add a "/" to the end of the path if missing', () => {
      const alteredPath = validPath[0].substring(0, validPath[0].length - 1);
      const result = options.parse([alteredPath]);
      expect(result.directoryPath.endsWith('/')).toBe(true);
    });
  });
});
