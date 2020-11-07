const gulp = require('gulp');
const childProcess = require('child_process');
var clean = require('gulp-clean');

const testFileDirectory = './test/test_data/';
const cleanTestFileDirectory = './test/clean_test_data/';

function cleanTestFiles() {
  return gulp.src(testFileDirectory + '*.*')
    .pipe(clean());
}

function copyTestFiles() {
  return gulp.src(cleanTestFileDirectory + '*.*')
    .pipe(gulp.dest(testFileDirectory));
}

function run() {
  return childProcess.exec('node main.js ' + testFileDirectory);
}

function test() {
  return childProcess.exec('yarn test');
}

exports.default = gulp.series(cleanTestFiles, copyTestFiles, run);
exports.reset = gulp.series(cleanTestFiles, copyTestFiles);
exports.test = gulp.series(cleanTestFiles, copyTestFiles, test);
