/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const buildCore = require('./build-core');

console.log('Watching file changes ...');

let watchTimeout;
fs.watch(path.resolve(__dirname, '../src'), { recursive: true }, () => {
  clearTimeout(watchTimeout);
  watchTimeout = setTimeout(() => {
    console.log('Building core');
    buildCore();
    console.log('Building core done');
  }, 100);
});
