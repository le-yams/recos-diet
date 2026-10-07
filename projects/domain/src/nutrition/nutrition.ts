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

import {DomainEventBus} from '../domain.events';
import {SelectedNutritionTypeEvent} from './nutrition.events';


export enum NutritionType {
  ENTERALE = 'Entérale',
  PARENTERALE = 'Parentérale'
}

export const DEFAULT_NUTRITION_TYPE = NutritionType.ENTERALE;

export class Nutrition {

  private selectedNutritionType!: NutritionType;

  constructor(private events: DomainEventBus) {
    this.selectNutritionType(DEFAULT_NUTRITION_TYPE)
  }

  getSelectedNutritionType() {
    return this.selectedNutritionType;
  }

  selectNutritionType(nutritionType: NutritionType) {
    if (this.selectedNutritionType !== nutritionType) {
      this.selectedNutritionType = nutritionType;
      this.events.publish(new SelectedNutritionTypeEvent(nutritionType))
    }
  }

}
