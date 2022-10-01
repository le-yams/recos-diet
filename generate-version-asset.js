/*
 * Copyright (c) 2022. Yann D'Isanto
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
