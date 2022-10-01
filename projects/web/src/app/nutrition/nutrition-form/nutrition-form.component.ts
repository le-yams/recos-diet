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
import {faUtensils} from '@fortawesome/free-solid-svg-icons';
import {NutritionType} from "@recos-diet/domain";
import {NutritionService} from "../nutrition.service";


@Component({
  selector: 'app-nutrition-form',
  templateUrl: './nutrition-form.component.html',
  styleUrls: ['./nutrition-form.component.css']
})
export class NutritionFormComponent {

  faUtensils = faUtensils;
  enterale = NutritionType.ENTERALE
  parenterale = NutritionType.PARENTERALE

  selectedNutritionType$;
  availableProduct$;
  selectedProduct$;

  constructor(private nutritionService: NutritionService) {
    this.availableProduct$ = nutritionService.availableProducts$;
    this.selectedNutritionType$ = nutritionService.nutritionType$;
    this.selectedProduct$ = nutritionService.selectedProduct$;
  }

  selectNutritionType(value: NutritionType) {
    this.nutritionService.selectNutritionType(value)
  }

  async selectProduct(value: string) {
    await this.nutritionService.selectProduct(value);
  }
}
