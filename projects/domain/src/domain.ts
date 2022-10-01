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

import {Products, ProductsRepository, ProductNutritionRepository} from "./nutrition/products";
import {Nutrition} from "./nutrition/nutrition";
import {Bibliography, BibliographyRepository} from "./bibliography/bibliography";
import {TargetFlows} from "./target-flows/target-flows";
import {Pathologies} from "./pathologies/pathologies";
import {Patient} from "./patient/patient";
import {MicronutrimentExclusionsRead, Micronutriments, MicronutrimentRecommendationsRead} from "./micronutriments/micronutriments";
import {Warnings, WarningsRead} from "./pathologies/warnings";


export class Domain {

  public readonly bibliography: Bibliography;
  public readonly micronutriments: Micronutriments;
  public readonly targetFlows: TargetFlows;
  public readonly products: Products;
  public readonly nutrition: Nutrition;
  public readonly pathologies: Pathologies;
  public readonly patient: Patient;
  public readonly warnings: Warnings;


  constructor(
    productsRepository: ProductsRepository,
    nutritionRepository: ProductNutritionRepository,
    bibliographyRepository: BibliographyRepository,
    enteraleRecommendationsRead: MicronutrimentRecommendationsRead,
    parenteraleRecommendationsRead: MicronutrimentRecommendationsRead,
    exclusionsRead: MicronutrimentExclusionsRead,
    warningsRead: WarningsRead) {
    this.warnings = new Warnings(warningsRead);
    this.bibliography = new Bibliography(bibliographyRepository);
    this.targetFlows = new TargetFlows();
    this.products = new Products(productsRepository, nutritionRepository);
    this.nutrition = new Nutrition();
    this.pathologies = new Pathologies();
    this.patient = new Patient();
    this.micronutriments = new Micronutriments({
      pathologies: this.pathologies.selectedPathologies,
      nutritionType: this.nutrition.getSelectedNutritionType(),
      enteraleRecommendationsRead: enteraleRecommendationsRead,
      parenteraleRecommendationsRead: parenteraleRecommendationsRead,
      exclusionsRead: exclusionsRead
    });
  }
}
