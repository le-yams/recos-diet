import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {DomainService} from "../../domain.service";
import {
  DomainEvents,
  NutritionistOpinionRequirementLevelChange,
  Warning,
  WarningLevel,
  WarningsChange
} from '@recos-diet/domain';

@Injectable({
  providedIn: 'root'
})
export class WarningsService {

  private readonly nutritionistOpinionRequirementLevel: BehaviorSubject<WarningLevel>;

  readonly nutritionistOpinionRequirementLevel$: Observable<WarningLevel>;

  private readonly warnings: BehaviorSubject<Warning[]>;

  readonly warnings$: Observable<Warning[]>;

  constructor(domainService: DomainService) {
    this.nutritionistOpinionRequirementLevel = new BehaviorSubject<WarningLevel>(domainService.warnings.getNutritionistOpinionRequirementLevel());
    this.nutritionistOpinionRequirementLevel$ = this.nutritionistOpinionRequirementLevel.asObservable();
    this.warnings = new BehaviorSubject<Warning[]>(domainService.warnings.getWarnings());
    this.warnings$ = this.warnings.asObservable();

    DomainEvents.subscribe<NutritionistOpinionRequirementLevelChange>(NutritionistOpinionRequirementLevelChange.name,
      evt => this.nutritionistOpinionRequirementLevel.next(evt.nutritionistOpinionRequirementLevel));
    DomainEvents.subscribe<WarningsChange>(WarningsChange.name,
      evt => this.warnings.next(evt.warnings));
  }
}
