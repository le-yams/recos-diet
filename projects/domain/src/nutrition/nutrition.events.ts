import {DomainEvent} from '../domain.events';
import {NutritionType} from "./nutrition";

export class SelectedNutritionTypeEvent implements DomainEvent {

  readonly name = SelectedNutritionTypeEvent.name;

  constructor(public readonly selectedNutritionType: NutritionType) {
  }
}
