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

import {
  AdministrationTerms,
  MicronutrimentRecommendation, MicronutrimentExclusionsRead,
  Micronutriments,
  MicronutrimentRecommendationsRead,
  SummarizedMicronutrimentRecommendation
} from './micronutriments';
import {NutritionType} from '../nutrition/nutrition';
import {Pathology} from '../pathologies/pathologies.data';
import {DomainEventBus} from "../domain.events";
import {SummarizedMicronutrimentRecommendationsUpdatedEvent} from "./micronutriments.events";
import {SelectedNutritionTypeEvent} from "../nutrition/nutrition.events";
import {EventsCaptor, TestDomainEventBus} from '../shared.spec';
import {SelectedPathologiesEvent} from '../pathologies/pathologies.event';

describe('Micronutriments', () => {

  let recommendations: Micronutriments;
  let events: DomainEventBus;
  let eventsCaptor: EventsCaptor<SummarizedMicronutrimentRecommendationsUpdatedEvent>;

  beforeEach(() => {
    events = new TestDomainEventBus();
    eventsCaptor = new EventsCaptor(SummarizedMicronutrimentRecommendationsUpdatedEvent.name, events);
  });

  afterEach(() => {
    recommendations.close();
    eventsCaptor.close();
  });

  it('should give recommendations for ENTERALE nutrition type', () => {
    // Given
    const enteraleRecommendationsRead = new TestRecosRead([reco('a')], new Map());
    const parenteraleRecommendationsRead = new TestRecosRead([reco('b')], new Map());
    recommendations = new Micronutriments({
      enteraleRecommendationsRead: enteraleRecommendationsRead,
      parenteraleRecommendationsRead: parenteraleRecommendationsRead,
      exclusionsRead: new TestRecoEclusionsRead(),
      nutritionType: NutritionType.PARENTERALE,
      pathologies: []
    }, events);

    // When
    events.publish(new SelectedNutritionTypeEvent(NutritionType.ENTERALE));

    // Then
    eventsCaptor.expectEventsCount(1);
    let summarizedRecommendations = eventsCaptor.mapSingleEvent(
      evt => evt.recommendations.map(reco => cloneSummarizedReco(reco))); // getting rid of returned reco internal methods preventing equal comparison
    expect(summarizedRecommendations).toEqual([
      summarizedReco('a')
    ]);
  });

  it('should give recommendations for PARENTERALE nutrition type', () => {
    // Given
    const enteraleRecommendationsRead = new TestRecosRead([reco('a')], new Map());
    const parenteraleRecommendationsRead = new TestRecosRead([reco('b')], new Map());
    recommendations = new Micronutriments({
      enteraleRecommendationsRead: enteraleRecommendationsRead,
      parenteraleRecommendationsRead: parenteraleRecommendationsRead,
      exclusionsRead: new TestRecoEclusionsRead(),
      nutritionType: NutritionType.ENTERALE,
      pathologies: []
    }, events);

    // When
    events.publish(new SelectedNutritionTypeEvent(NutritionType.PARENTERALE));

    // Then
    eventsCaptor.expectEventsCount(1);
    let summarizedRecommendations = eventsCaptor.mapSingleEvent(
      evt => evt.recommendations.map(reco => cloneSummarizedReco(reco))); // getting rid of returned reco internal methods preventing equal comparison
    expect(summarizedRecommendations).toEqual([summarizedReco('b')]);
  });

  it('should give recommendations for ENTERALE nutrition type and given pathology', () => {
    // Given
    const enteraleRecommendationsRead = new TestRecosRead(
      [reco("a")],
      new Map([
        [Pathology.CIRRHOTIQUE, [reco("b"), reco("c")]],
        [Pathology.CVVHDF, [reco("d")]]
      ]));
    const parenteraleRecommendationsRead = new TestRecosRead([reco("d")], new Map());
    recommendations = new Micronutriments({
      enteraleRecommendationsRead: enteraleRecommendationsRead,
      parenteraleRecommendationsRead: parenteraleRecommendationsRead,
      exclusionsRead: new TestRecoEclusionsRead(),
      nutritionType: NutritionType.ENTERALE,
      pathologies: []
    }, events);

    // When
    events.publish(new SelectedPathologiesEvent([Pathology.CIRRHOTIQUE]));

    // Then
    eventsCaptor.expectEventsCount(1);
    let summarizedRecommendations = eventsCaptor.mapSingleEvent(
      evt => evt.recommendations.map(reco => cloneSummarizedReco(reco))); // getting rid of returned reco internal methods preventing equal comparison
    expect(summarizedRecommendations).toEqual([
      summarizedReco('a'),
      summarizedReco('b'),
      summarizedReco('c'),
    ]);
  });

  it('should merge clauses for multiple recos on same micronutriment', () => {
    // Given
    const enteraleRecommendationsRead = new TestRecosRead(
      [recoWithClauses("a", ["ca1", "ca2"])],
      new Map([
        [Pathology.CIRRHOTIQUE, [recoWithClauses("a", ["ca2", "ca3"]), reco("b")]],
        [Pathology.CVVHDF, [recoWithClauses("b", ["cb1", "cb2"]), reco("c")]]
      ]));
    const parenteraleRecommendationsRead = new TestRecosRead([reco("d")], new Map());
    recommendations = new Micronutriments({
      enteraleRecommendationsRead: enteraleRecommendationsRead,
      parenteraleRecommendationsRead: parenteraleRecommendationsRead,
      exclusionsRead: new TestRecoEclusionsRead(),
      nutritionType: NutritionType.ENTERALE,
      pathologies: []
    }, events);

    // When
    events.publish(new SelectedPathologiesEvent([Pathology.CIRRHOTIQUE, Pathology.CVVHDF]));

    // Then
    eventsCaptor.expectEventsCount(1);
    let summarizedRecommendations = eventsCaptor.mapSingleEvent(
      evt => evt.recommendations.map(reco => cloneSummarizedReco(reco))); // getting rid of returned reco internal methods preventing equal comparison
    expect(summarizedRecommendations).toEqual([
      summarizedRecoWithClauses("a", ["ca1", "ca2", "ca3"]),
      summarizedRecoWithClauses("b", ["cb1", "cb2"]),
      summarizedReco("c")
    ]);
  });

  it('should merge exclude specified clauses', () => {
    // Given
    const enteraleRecommendationsRead = new TestRecosRead(
      [recoWithClauses("a", ["c1", "c2"])], new Map([
        [Pathology.CIRRHOTIQUE, [reco("b"), recoWithExcludedClauses("a", ["c2"])]]
      ]));
    const parenteraleRecommendationsRead = new TestRecosRead([reco("d")], new Map());
    recommendations = new Micronutriments({
      enteraleRecommendationsRead: enteraleRecommendationsRead,
      parenteraleRecommendationsRead: parenteraleRecommendationsRead,
      exclusionsRead: new TestRecoEclusionsRead(),
      nutritionType: NutritionType.ENTERALE,
      pathologies: []
    }, events);

    // When
    events.publish(new SelectedPathologiesEvent([Pathology.CIRRHOTIQUE]));

    // Then
    eventsCaptor.expectEventsCount(1);
    let summarizedRecommendations = eventsCaptor.mapSingleEvent(
      evt => evt.recommendations.map(reco => cloneSummarizedReco(reco))); // getting rid of returned reco internal methods preventing equal comparison
    expect(summarizedRecommendations).toEqual([
      summarizedRecoWithClauses("a", ["c1"]),
      summarizedReco("b")
    ]);
  });

  it('should merge quantities keeping max value and associated unit', () => {
    // Given
    const enteraleRecommendationsRead = new TestRecosRead(
      [recoWithAdministrationTerms("a", 7, 'unit1')], new Map([
        [Pathology.CIRRHOTIQUE, [recoWithAdministrationTerms("a", 42, 'unit2')]],
        [Pathology.CVVHDF, [recoWithAdministrationTerms("a", 24, 'unit3')]]
      ]));
    recommendations = new Micronutriments({
      enteraleRecommendationsRead: enteraleRecommendationsRead,
      parenteraleRecommendationsRead: emptyRecoRead(),
      exclusionsRead: new TestRecoEclusionsRead(),
      nutritionType: NutritionType.ENTERALE,
      pathologies: []
    }, events);

    // When
    events.publish(new SelectedPathologiesEvent([Pathology.CIRRHOTIQUE]));

    // Then
    eventsCaptor.expectEventsCount(1);
    let summarizedRecommendations = eventsCaptor.mapSingleEvent(
      evt => evt.recommendations.map(reco => cloneSummarizedReco(reco))); // getting rid of returned reco internal methods preventing equal comparison
    expect(summarizedRecommendations).toEqual([
      summarizedRecoWithAdministrationTerms("a", 42, 'unit2')
    ]);
  });

  it('should remove excluded micronutriment', () => {
    // Given
    const enteraleRecommendationsRead = new TestRecosRead(
      [reco("a")],
      new Map([
        [Pathology.ANOREXIE_MENTALE, [reco("b")]],
        [Pathology.CVVHDF, [reco("c"), reco("d")]]
      ]));
    const parenteraleRecommendationsRead = new TestRecosRead([reco("d")], new Map());
    recommendations = new Micronutriments({
      enteraleRecommendationsRead: enteraleRecommendationsRead,
      parenteraleRecommendationsRead: parenteraleRecommendationsRead,
      exclusionsRead: new TestRecoEclusionsRead(new Map([
        [Pathology.ANOREXIE_MENTALE, ["c"]],
      ])),
      nutritionType: NutritionType.ENTERALE,
      pathologies: []
    }, events);

    // When
    events.publish(new SelectedPathologiesEvent([Pathology.ANOREXIE_MENTALE, Pathology.CVVHDF]));

    // Then
    eventsCaptor.expectEventsCount(1);
    let summarizedRecommendations = eventsCaptor.mapSingleEvent(
      evt => evt.recommendations.map(reco => cloneSummarizedReco(reco))); // getting rid of returned reco internal methods preventing equal comparison
    expect(summarizedRecommendations).toEqual([
      summarizedReco('a'),
      summarizedReco('b'),
      summarizedReco('d'),
    ]);
  });

});


class TestRecosRead implements MicronutrimentRecommendationsRead {

  constructor(
    private sharedRecos: MicronutrimentRecommendation[],
    private pathosRecos: Map<Pathology, MicronutrimentRecommendation[]>) {
  }

  pathologyRecommendations(pathology: Pathology): MicronutrimentRecommendation[] {
    return this.pathosRecos.get(pathology)!;
  }

  sharedRecommendations(): MicronutrimentRecommendation[] {
    return this.sharedRecos;
  }

}

class TestRecoEclusionsRead implements MicronutrimentExclusionsRead {

  constructor(
    private pathosExclusions: Map<Pathology, string[]> = new Map()) {
  }

  pathologyNutrimentExclusions(pathology: Pathology): string[] {
    return this.pathosExclusions.get(pathology) ?? [];
  }
}


const reco = (micronutriment: string): MicronutrimentRecommendation => {
  return {
    micronutriment: micronutriment,
    clauses: [],
    excludedClauses: [],
    sources: []
  };
}

const recoWithClauses = (micronutriment: string, clauses: string[]): MicronutrimentRecommendation => {
  return {
    ...reco(micronutriment),
    clauses: clauses,
  };
}

const recoWithAdministrationTerms = (micronutriment: string, quantity: number, unit: string): MicronutrimentRecommendation => {
  return {
    ...reco(micronutriment),
    administrationTerms: new AdministrationTerms(quantity, unit)
  };
}

const recoWithExcludedClauses = (micronutriment: string, excludedClauses: string[]): MicronutrimentRecommendation => {
  return {
    ...reco(micronutriment),
    excludedClauses: excludedClauses,
  };
}

const summarizedReco = (micronutriment: string): SummarizedMicronutrimentRecommendation => {
  return {
    micronutriment: micronutriment,
    administrationTerms: undefined,
    clauses: [],
    sources: []
  };
}

const summarizedRecoWithClauses = (micronutriment: string, clauses: string[]): SummarizedMicronutrimentRecommendation => {
  return {
    ...summarizedReco(micronutriment),
    clauses: clauses,
  };
}

const summarizedRecoWithAdministrationTerms = (micronutriment: string, quantity: number, unit: string): SummarizedMicronutrimentRecommendation => {
  return {
    ...summarizedReco(micronutriment),
    administrationTerms: new AdministrationTerms(quantity, unit)
  };
}

const cloneSummarizedReco = (reco: SummarizedMicronutrimentRecommendation): SummarizedMicronutrimentRecommendation => {
  return {
    micronutriment: reco.micronutriment,
    administrationTerms: reco.administrationTerms,
    clauses: reco.clauses,
    sources: reco.sources
  };
}

const emptyRecoRead = () => new TestRecosRead([], new Map())
