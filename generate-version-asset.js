const path = require('path');
const colors = require('colors/safe');
const fs = require('fs');
const appVersion = require('./package.json').version;

const outputfilePath = path.join(__dirname + '/projects/web/src/version.json');

console.log(colors.cyan('\nGenerating application version asset...'));

fs.writeFile(
  outputfilePath,
  JSON.stringify({version: appVersion}),
  function (err) {
    if (err) {
      return console.error(colors.red(err));
    }
    console.log(
      colors.green(`asset successfully generated with version ${colors.yellow(appVersion)} at ${colors.yellow(outputfilePath)}`)
    );
  });
