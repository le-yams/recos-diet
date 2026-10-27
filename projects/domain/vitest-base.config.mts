/*
 * Copyright (c) 2026. Yann D'Isanto
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

// Completes what the unit-test builder of angular.json sets (jsdom, the specs, the globals)
import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    // spies back to the original after each test, as with Jasmine
    restoreMocks: true,
    // where CI reads the reports: JUnit with --reporters=junit, Cobertura (sent to Coveralls) with --coverage
    outputFile: {junit: 'reports/domain/ng-test-domain.xunit.xml'},
    coverage: {
      reportsDirectory: 'reports/domain',
      reporter: [['cobertura', {file: 'ng-coverage-domain.cobertura.xml'}]]
    }
  }
});
