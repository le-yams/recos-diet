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

import {NutritionType} from '../nutrition/nutrition';
import {Pathology} from '../pathologies/pathologies.data';
import {group, mapValues, notIn} from '../utils';
import {DomainEventBus, Subscription} from '../domain.events';
import {SelectedNutritionTypeEvent} from '../nutrition/nutrition.events';
import {SummarizedMicronutrimentRecommendationsUpdatedEvent} from './micronutriments.events';
import {SelectedPathologiesEvent} from '../pathologies/pathologies.event';
import {Comparable, maxOf} from '../comparison/comparison';


const groupRecosByMicronutriment = function (sharedRecos: MicronutrimentRecommendation[], pathosRecos: MicronutrimentRecommendation[], micronutrimentExclusions: string[]): Map<string, MicronutrimentRecommendation[]> {
  const recos = [
    ...sharedRecos,
    ...pathosRecos
  ].filter(reco => !micronutrimentExclusions.includes(reco.micronutriment));
  return group(recos).by(reco => reco.micronutriment);
}

export class AdministrationTerms implements Comparable<AdministrationTerms>{

  constructor(readonly quantity: number, readonly unit: string) {
  }

  compareTo(other: AdministrationTerms): number {
    return this.quantity - other.quantity;
  }

  // the highest quantity with its unit; these terms when the other recommendation gives none
  merge(other?: AdministrationTerms): AdministrationTerms {
    if (!other) {
      return this;
    }
    const max = maxOf(this, other);
    return new AdministrationTerms(max.quantity, max.unit);
  }

}

export interface MicronutrimentRecommendation {

  readonly micronutriment: string;
  readonly administrationTerms?: AdministrationTerms;
  readonly clauses: string[];
  readonly excludedClauses?: string[];
  readonly sources: string[];

}

export interface SummarizedMicronutrimentRecommendation {
  readonly micronutriment: string;
  readonly administrationTerms?: AdministrationTerms;
  readonly clauses: string[];
  readonly sources: string[];
}

class MergeableMicronutrimentRecommendation implements SummarizedMicronutrimentRecommendation, MicronutrimentRecommendation {
  readonly micronutriment: string;
  readonly administrationTerms?: AdministrationTerms;
  readonly clauses: string[];
  readonly excludedClauses: string[];
  readonly sources: string[];

  constructor(recommendation: MicronutrimentRecommendation) {
    this.micronutriment = recommendation.micronutriment;
    this.administrationTerms = recommendation.administrationTerms;
    this.clauses = recommendation.clauses;
    this.excludedClauses = recommendation.excludedClauses ?? [];
    this.sources = recommendation.sources;
    if (recommendation.administrationTerms) {
      this.administrationTerms = new AdministrationTerms(
        recommendation.administrationTerms.quantity,
        recommendation.administrationTerms.unit
      );
    }
  }

  merge(other: MicronutrimentRecommendation): MergeableMicronutrimentRecommendation {
    const excludedClauses = [...new Set(this.excludedClauses.concat(other.excludedClauses ?? []))];
    const clauses = [...new Set(this.clauses.concat(other.clauses))]
      .filter(notIn(excludedClauses));
    return new MergeableMicronutrimentRecommendation({
      micronutriment: this.micronutriment,
      // the highest quantity of the recommendations that give one
      administrationTerms: this.administrationTerms?.merge(other.administrationTerms) ?? other.administrationTerms,
      clauses: clauses,
      excludedClauses: excludedClauses,
      sources: [...new Set(this.sources.concat(other.sources))]
    });
  }
}

const byMicronutriment = function (reco1: SummarizedMicronutrimentRecommendation, reco2: SummarizedMicronutrimentRecommendation): number {
  return reco1.micronutriment.localeCompare(reco2.micronutriment);
};

// a group of group().by(), so never empty
const summarizeMicronutrimentRecommendations = function (micronutrimentRecos: MicronutrimentRecommendation[]) {
  const [firstRecommendation, ...otherRecommendations] = micronutrimentRecos;
  return otherRecommendations.reduce((mergeableRecommendation: MergeableMicronutrimentRecommendation, nextRecommendation: MicronutrimentRecommendation) => {
    return mergeableRecommendation.merge(nextRecommendation);
  }, new MergeableMicronutrimentRecommendation(firstRecommendation));
}

export interface MicronutrimentRecommendationsRead {

  sharedRecommendations(): MicronutrimentRecommendation[]

  pathologyRecommendations(pathology: Pathology): MicronutrimentRecommendation[]
}

export interface MicronutrimentExclusionsRead {

  pathologyNutrimentExclusions(pathology: Pathology): string[];
}

export interface MicronutrimentRecommendationsContext {
  readonly enteraleRecommendationsRead: MicronutrimentRecommendationsRead;
  readonly parenteraleRecommendationsRead: MicronutrimentRecommendationsRead;
  readonly exclusionsRead: MicronutrimentExclusionsRead;
  readonly nutritionType: NutritionType;
  readonly pathologies: Pathology[];
}

class Context implements MicronutrimentRecommendationsContext {

  readonly enteraleRecommendationsRead: MicronutrimentRecommendationsRead;
  readonly parenteraleRecommendationsRead: MicronutrimentRecommendationsRead;
  readonly exclusionsRead: MicronutrimentExclusionsRead;
  readonly nutritionType: NutritionType;
  readonly pathologies: Pathology[];

  // a Record rather than a Map: the compiler checks that every nutrition type has its repository
  private readonly repos: Record<NutritionType, MicronutrimentRecommendationsRead>;

  constructor(context: MicronutrimentRecommendationsContext) {
    this.nutritionType = context.nutritionType;
    this.pathologies = context.pathologies;
    this.enteraleRecommendationsRead = context.enteraleRecommendationsRead;
    this.parenteraleRecommendationsRead = context.parenteraleRecommendationsRead;
    this.exclusionsRead = context.exclusionsRead;
    this.repos = {
      [NutritionType.ENTERALE]: context.enteraleRecommendationsRead,
      [NutritionType.PARENTERALE]: context.parenteraleRecommendationsRead
    };
  }

  recommendationsGroupedByMicronutriment(): Map<string, MicronutrimentRecommendation[]> {
    const repository = this.repos[this.nutritionType];
    const sharedRecos = repository.sharedRecommendations();
    const pathosRecos = this.pathologies.flatMap(
      pathology => repository.pathologyRecommendations(pathology));
    const nutrimentExclusions = this.pathologies.flatMap(
      pathology => this.exclusionsRead.pathologyNutrimentExclusions(pathology));
    return groupRecosByMicronutriment(sharedRecos, pathosRecos, nutrimentExclusions);
  }

  summarizeRecommendations(): SummarizedMicronutrimentRecommendation[] {
    const recosByMicronutriment = this.recommendationsGroupedByMicronutriment();
    return mapValues(recosByMicronutriment, summarizeMicronutrimentRecommendations)
      .sort(byMicronutriment);
  }

  withNutritionType(nutritionType: NutritionType) {
    if (nutritionType === this.nutritionType) {
      return this;
    }
    return new Context({
      ...this,
      nutritionType: nutritionType
    });
  }

  withPathologies(pathologies: Pathology[]) {
    if (pathologies === this.pathologies) {
      return this;
    }
    return new Context({
      ...this,
      pathologies: pathologies
    });
  }
}

export class Micronutriments {

  private context!: Context;
  private subscriptions: Subscription[];
  private summarizedRecommendations: SummarizedMicronutrimentRecommendation[] = [];

  constructor(contextParams: MicronutrimentRecommendationsContext, private events: DomainEventBus) {
    this.context = new Context(contextParams);
    this.summarizedRecommendations = this.context.summarizeRecommendations();
    this.subscriptions = [
      this.events.subscribe(SelectedNutritionTypeEvent,
        evt => this.updateSelectedNutritionType(evt.selectedNutritionType)),
      this.events.subscribe(SelectedPathologiesEvent,
        evt => this.updateSelectedPathologies(evt.pathologies))
    ];
  }

  getSummarizedRecommendations(): SummarizedMicronutrimentRecommendation[] {
    return this.summarizedRecommendations;
  }

  private updateContext(context: Context) {
    this.context = context;
    this.summarizedRecommendations = context.summarizeRecommendations();
    this.events.publish(new SummarizedMicronutrimentRecommendationsUpdatedEvent(this.summarizedRecommendations));
  }

  private updateSelectedNutritionType(nutritionType: NutritionType) {
    this.updateContext(this.context.withNutritionType(nutritionType));
  }

  private updateSelectedPathologies(pathologies: Pathology[]) {
    this.updateContext(this.context.withPathologies(pathologies));
  }

  close() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
