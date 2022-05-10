import {DomainEvent} from '../domain.events';
import {Warning, WarningLevel} from './warnings.data';

export class NutritionistOpinionRequirementLevelChange implements DomainEvent {

  readonly name = NutritionistOpinionRequirementLevelChange.name;

  constructor(public nutritionistOpinionRequirementLevel: WarningLevel) {
  }
}

export class WarningsChange implements DomainEvent {

  readonly name = WarningsChange.name;

  constructor(public warnings: Warning[]) {
  }
}
