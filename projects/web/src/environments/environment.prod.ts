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

import {hourInMillis, minuteInMillis} from '../utils';

export const environment = {
  production: true,
  // eslint-disable-next-line @typescript-eslint/no-var-requires -- remplacé par la lecture de version.json (#75)
  appVersion: require('../../../../package.json').version,
  appUpdateCheckDelay: 20 * minuteInMillis,
  updateWarningSleep: 2 * hourInMillis
};
