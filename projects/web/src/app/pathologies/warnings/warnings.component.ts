import {Component} from '@angular/core';
import {WarningsService} from "./warnings.service";
import {Observable} from "rxjs";
import {Verbose, Warning, WarningLevel} from '@recos-diet/domain';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-warnings',
  templateUrl: './warnings.component.html',
  styleUrls: ['./warnings.component.css']
})
export class WarningsComponent {

  readonly nutritionistOpinionRequirementLevel$: Observable<NutritionistOpinionRequirementLevelWrapper>;
  readonly warnings$: Observable<WarningView[]>;

  constructor(warningsService: WarningsService) {
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
    Verbose.log(warning.level, 'warning:', warning.text);
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
