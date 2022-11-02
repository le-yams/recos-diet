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

import {DomainEventBus, Subscription} from "../domain.events";
import {Pathology} from "./pathologies.data";
import {SelectedPathologiesEvent} from "./pathologies.event";
import {Warning, WarningLevel} from './warnings.data';
import {NutritionistOpinionRequirementLevelChange, WarningsChange} from './warnings.events';

export interface WarningsRead {

  nutritionistOpinionRequirement(pathology: Pathology): WarningLevel;

  pathologyWarnings(pathology: Pathology): Warning[]

}

export class Warnings {

  private nutritionistOpinionRequirementLevel: WarningLevel = WarningLevel.NONE;
  private warnings: Warning[] = [];
  private subscriptions: Subscription[];

  constructor(private repo: WarningsRead, private events: DomainEventBus) {
    this.subscriptions = [
      this.events.subscribe<SelectedPathologiesEvent>(SelectedPathologiesEvent.name,
        evt => this.selectedPathologiesChange(evt.pathologies))
    ];
  }

  getNutritionistOpinionRequirementLevel(): WarningLevel {
    return this.nutritionistOpinionRequirementLevel;
  }

  getWarnings(): Warning[] {
    return this.warnings;
  }

  private selectedPathologiesChange(pathologies: Pathology[]) {
    this.nutritionistOpinionRequirementLevel = this.computeNutritionistOpinionRequirementLevel(pathologies);
    this.events.publish(new NutritionistOpinionRequirementLevelChange(this.nutritionistOpinionRequirementLevel));

    this.warnings = this.computeWarnings(pathologies);
    this.events.publish(new WarningsChange(this.warnings));
  }

  private computeNutritionistOpinionRequirementLevel(pathologies: Pathology[]) {
    let levels = pathologies.map(pathology => this.repo.nutritionistOpinionRequirement(pathology));
    levels.push(WarningLevel.NONE);
    return Math.max(...levels);
  }

  private computeWarnings(pathologies: Pathology[]) {
    return pathologies
      .flatMap(pathology => this.repo.pathologyWarnings(pathology))
      .filter((warn: Warning, index: number, warns: Warning[]) => {
        let foundIndex = warns.findIndex(warn2 => warn.text === warn2.text);
        return index === foundIndex;
      });
  }

  close() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
