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

import {DomainEventBus, Subscription} from '../domain.events';
import {Pathology} from './pathologies.data';
import {SelectedPathologiesEvent} from './pathologies.event';
import {Warning, WarningLevel} from '../warnings.data';
import {
  NutritionistOpinionRequirementLevelChange,
  PathologiesWarningsChange,
  ProductWarningsChange
} from './warnings.events';
import {SelectedProductEvent} from '../nutrition/products.events';

export interface WarningsRead {

  nutritionistOpinionRequirement(pathology: Pathology): WarningLevel;

  pathologyWarnings(pathology: Pathology): Warning[]

  productWarnings(product: string): Warning[]

}

export class Warnings {

  private nutritionistOpinionRequirementLevel: WarningLevel = WarningLevel.NONE;
  private pathologiesWarnings: Warning[] = [];
  private productWarnings: Warning[] = [];
  private subscriptions: Subscription[];

  constructor(private repo: WarningsRead, private events: DomainEventBus) {
    this.subscriptions = [
      this.events.subscribe<SelectedPathologiesEvent>(SelectedPathologiesEvent.name,
        evt => this.selectedPathologiesChange(evt.pathologies)),
      this.events.subscribe<SelectedProductEvent>(SelectedProductEvent.name,
        evt => this.selectedProductChange(evt.selectedProduct))
    ];
  }

  getNutritionistOpinionRequirementLevel(): WarningLevel {
    return this.nutritionistOpinionRequirementLevel;
  }

  getPathologiesWarnings(): Warning[] {
    return this.pathologiesWarnings;
  }

  getProductWarnings(): Warning[] {
    return this.productWarnings;
  }

  private selectedPathologiesChange(pathologies: Pathology[]) {
    this.nutritionistOpinionRequirementLevel = this.computeNutritionistOpinionRequirementLevel(pathologies);
    this.events.publish(new NutritionistOpinionRequirementLevelChange(this.nutritionistOpinionRequirementLevel));

    this.pathologiesWarnings = this.computePathologiesWarnings(pathologies);
    this.events.publish(new PathologiesWarningsChange(this.pathologiesWarnings));
  }

  private selectedProductChange(product: string) {
    this.productWarnings = this.computeProductWarnings(product);
    this.events.publish(new ProductWarningsChange(this.productWarnings));
  }

  private computeNutritionistOpinionRequirementLevel(pathologies: Pathology[]) {
    const levels = pathologies.map(pathology => this.repo.nutritionistOpinionRequirement(pathology));
    levels.push(WarningLevel.NONE);
    return Math.max(...levels);
  }

  private computePathologiesWarnings(pathologies: Pathology[]): Warning[] {
    return pathologies
      .flatMap(pathology => this.repo.pathologyWarnings(pathology))
      .filter((warn: Warning, index: number, warns: Warning[]) => {
        const foundIndex = warns.findIndex(warn2 => warn.text === warn2.text);
        return index === foundIndex;
      });
  }

  private computeProductWarnings(product: string): Warning[] {
    return this.repo.productWarnings(product)
      .filter((warn: Warning, index: number, warns: Warning[]) => {
        const foundIndex = warns.findIndex(warn2 => warn.text === warn2.text);
        return index === foundIndex;
      });
  }

  close() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
