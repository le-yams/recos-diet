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

import {versionPageUrl} from './footer.component';

describe('versionPageUrl', () => {
  [
    {version: '2.4.0', expected: 'https://github.com/recos-diet/recos-diet/releases/tag/2.4.0'},
    {version: '2.4.0-rc.12+a1b2c3d', expected: 'https://github.com/recos-diet/recos-diet/commit/a1b2c3d'},
    {version: '2.3.1+a1b2c3d', expected: 'https://github.com/recos-diet/recos-diet/commit/a1b2c3d'},
    {version: 'SNAPSHOT-2026-10-15T08:00:00.000Z', expected: 'https://github.com/recos-diet/recos-diet/releases'},
  ].forEach(({version, expected}) => {
    it(`should link ${version} to ${expected}`, () => {
      expect(versionPageUrl(version)).toBe(expected);
    });
  });
});
