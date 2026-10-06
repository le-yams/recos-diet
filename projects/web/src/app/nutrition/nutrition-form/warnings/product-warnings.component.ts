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

import {Component} from '@angular/core';
import {ProductWarningsService} from "./product-warnings.service";
import {Observable} from "rxjs";
import {Warning, WarningLevel} from '@recos-diet/domain';
import {map} from "rxjs/operators";
import {Verbose} from "../../../../infra/utils";

@Component({
  selector: 'app-warnings',
  templateUrl: './product-warnings.component.html',
  styleUrls: ['./product-warnings.component.css'],
  standalone: false
})
export class ProductWarningsComponent {

  readonly warnings$: Observable<WarningView[]>;

  constructor(warningsService: ProductWarningsService) {
    this.warnings$ = warningsService.warnings$.pipe(
      map(warnings => warnings
        .sort(byLevel)
        .map(warning => new WarningView(warning))
      )
    );
  }

}

class WarningView implements Warning {

  text: string;
  level: WarningLevel;
  sources: string[];

  constructor(warning: Warning) {
    this.text = warning.text;
    this.level = warning.level;
    this.sources = warning.sources;
    Verbose.log(WarningLevel[this.level], 'warning:', warning.text);
  }

  isHigh(): boolean {
    return this.level === WarningLevel.HIGH;
  }

  isMedium(): boolean {
    return this.level === WarningLevel.MEDIUM;
  }
}

const byLevel = function (a: Warning, b: Warning): number {
  return a.level - b.level;
}
