import {DomainEvents} from '../domain.events';
import {SelectedNutritionTypeEvent} from "./nutrition.events";


export enum NutritionType {
  ENTERALE = "Entérale",
  PARENTERALE = "Parentérale"
}

export const DEFAULT_NUTRITION_TYPE = NutritionType.ENTERALE;

export class Nutrition {

  private selectedNutritionType!: NutritionType;

  constructor() {
    this.selectNutritionType(DEFAULT_NUTRITION_TYPE)
  }

  getSelectedNutritionType() {
    return this.selectedNutritionType;
  }

  selectNutritionType(nutritionType: NutritionType) {
    if (this.selectedNutritionType !== nutritionType) {
      this.selectedNutritionType = nutritionType;
      DomainEvents.publish(new SelectedNutritionTypeEvent(nutritionType))
    }
  }

}
