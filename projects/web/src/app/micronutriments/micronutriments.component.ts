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

import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MicronutrimentsService} from "./micronutriments.service";
import {Observable} from "rxjs";
import {SummarizedMicronutrimentRecommendation} from "@recos-diet/domain";
import {map, tap} from "rxjs/operators";
import {Verbose} from "../../infra/utils";

@Component({
  selector: 'app-nutriments',
  templateUrl: './micronutriments.component.html',
  styleUrls: ['./micronutriments.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class MicronutrimentsComponent {

  readonly recommendations$: Observable<SummarizedMicronutrimentRecommendation[]>;

  constructor(nutrimentsService: MicronutrimentsService) {
    this.recommendations$ = nutrimentsService.nutrimentRecommendations$.pipe(
      map(recommendations => recommendations.sort(byNutrimentLabel)),
      tap(recommendations => Verbose.log('recommendations updated', recommendations))
    );
  }

  renderClause(clause: string) {
    return new ClauseRenderer(clause).render();
  }
}

const byNutrimentLabel = function (reco1: SummarizedMicronutrimentRecommendation, reco2: SummarizedMicronutrimentRecommendation): number {
  return reco1.micronutriment.localeCompare(reco2.micronutriment);
};

const CLAUSE_RENDERING_REPLACEMENTS: [string, string][] = [
  ["    ", "&nbsp;&nbsp;&nbsp;&nbsp;"],
  ["->", "&rarr;"],
  ["=>", "&rArr;"],
  [">=", "&ge;"],
  ["<=", "&le;"],
  ["<", "&lt;"],
  [">", "&gt;"],
]

class ClauseRenderer {

  constructor(private clause: string) {
  }

  render(): string {
    return CLAUSE_RENDERING_REPLACEMENTS
      .reduce(applyingReplacementTo, this.clause);
  }
}

const applyingReplacementTo = (clause: string, replacement: [string, string]) => clause.replace(replacement[0], replacement[1]);
