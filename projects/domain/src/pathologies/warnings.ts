import {DomainEvents} from "../domain.events";
import {Pathology} from "./pathologies.data";
import {Subscription} from "../pubsub/pubsub";
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

  constructor(private repo: WarningsRead) {
    this.subscriptions = [
      DomainEvents.subscribe<SelectedPathologiesEvent>(SelectedPathologiesEvent.name,
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
    DomainEvents.publish(new NutritionistOpinionRequirementLevelChange(this.nutritionistOpinionRequirementLevel));

    this.warnings = this.computeWarnings(pathologies);
    DomainEvents.publish(new WarningsChange(this.warnings));
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
