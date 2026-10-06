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

import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {PathologiesWarningsService} from "./pathologies-warnings.service";
import {Observable} from "rxjs";
import {Warning, WarningLevel} from '@recos-diet/domain';
import {map} from "rxjs/operators";
import {Verbose} from "../../../infra/utils";
import {BiblioLinksComponent} from '../../bibliography/biblio-links/biblio-links.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-warnings',
  templateUrl: './pathologies-warnings.component.html',
  styleUrls: ['./pathologies-warnings.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [BiblioLinksComponent, AsyncPipe]
})
export class PathologiesWarningsComponent {

  readonly nutritionistOpinionRequirementLevel$: Observable<NutritionistOpinionRequirementLevelWrapper>;
  readonly warnings$: Observable<WarningView[]>;

  constructor() {
    const warningsService = inject(PathologiesWarningsService);

    this.nutritionistOpinionRequirementLevel$ = warningsService.nutritionistOpinionRequirementLevel$
      .pipe(map(req => new NutritionistOpinionRequirementLevelWrapper(req)));
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

class NutritionistOpinionRequirementLevelWrapper {

  constructor(private nutritionistOpinionRequirement: WarningLevel) {
  }

  isHigh(): boolean {
    return this.nutritionistOpinionRequirement === WarningLevel.HIGH;
  }

  isMedium(): boolean {
    return this.nutritionistOpinionRequirement === WarningLevel.MEDIUM;
  }
}

const byLevel = function (a: Warning, b: Warning): number {
  return a.level - b.level;
}
