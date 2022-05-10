import {Component} from '@angular/core';
import {MicronutrimentsService} from "./micronutriments.service";
import {Observable} from "rxjs";
import {SummarizedMicronutrimentRecommendation, Verbose} from "@recos-diet/domain";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-nutriments',
  templateUrl: './micronutriments.component.html',
  styleUrls: ['./micronutriments.component.css']
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
