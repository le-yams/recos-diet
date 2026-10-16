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

import {EventsCaptor} from '../shared.spec';
import {InMemoryDomainEventBus} from '../in-memory-domain-event-bus';
import {Warnings, WarningsRead} from './warnings';
import {SelectedPathologiesEvent} from './pathologies.event';
import {DomainEventBus} from '../domain.events';
import {Pathology} from './pathologies.data';
import {
  NutritionistOpinionRequirementLevelChange,
  PathologiesWarningsChange,
  ProductWarningsChange
} from './warnings.events';
import {Warning, WarningLevel} from '../warnings.data';
import {SelectedProductEvent} from '../nutrition/products.events';

describe('Warnings should', () => {

  let warnings: Warnings;
  let events: DomainEventBus;
  let eventsCaptor: EventsCaptor<NutritionistOpinionRequirementLevelChange>;

  beforeEach(() => {
    events = new InMemoryDomainEventBus();
    eventsCaptor = new EventsCaptor(NutritionistOpinionRequirementLevelChange, events);
  });

  afterEach(() => {
    warnings.close();
    eventsCaptor.close();
  });

  const params = [
    {
      description: 'raise event with null nutrionist opinion requirement when no pathology selected',
      pathologies: [],
      definedRequirements: new Map([
        [Pathology.CIRRHOTIQUE, WarningLevel.MEDIUM]
      ]),
      expectedRequirement: WarningLevel.NONE
    },
    {
      description: 'raise event with nutrionist opinion requirement (single MEDIUM)',
      definedRequirements: new Map([
        [Pathology.CIRRHOTIQUE, WarningLevel.MEDIUM]
      ]),
      pathologies: [Pathology.CIRRHOTIQUE],
      expectedRequirement: WarningLevel.MEDIUM
    },
    {
      description: 'raise event with higher nutrionist opinion requirement (MEDIUM,HIGH)',
      definedRequirements: new Map([
        [Pathology.CIRRHOTIQUE, WarningLevel.MEDIUM],
        [Pathology.ANOREXIE_MENTALE, WarningLevel.HIGH]
      ]),
      pathologies: [Pathology.CIRRHOTIQUE, Pathology.ANOREXIE_MENTALE],
      expectedRequirement: WarningLevel.HIGH
    }
  ];

  params.forEach(param => it(param.description, () => {
    // Given
    warnings = new Warnings(new TestWarningsRead(param.definedRequirements), events);

    // When
    events.publish(new SelectedPathologiesEvent(param.pathologies))

    // Then
    eventsCaptor.expectEventsCount(1);
    const nutritionistOpinionRequirement = eventsCaptor.mapSingleEvent(evt => evt.nutritionistOpinionRequirementLevel);
    expect(nutritionistOpinionRequirement).toBe(param.expectedRequirement);
  }));

});


const WARN1 = {
  text: 'warn 1',
  level: WarningLevel.MEDIUM,
  sources: []
};
const WARN2 = {
  text: 'warn 2',
  level: WarningLevel.MEDIUM,
  sources: []
};
const WARN3 = {
  text: 'warn 3',
  level: WarningLevel.MEDIUM,
  sources: []
};
const HIGH_WARN = {
  text: 'high warn',
  level: WarningLevel.HIGH,
  sources: []
};
describe('Warnings should', () => {

  let warnings: Warnings;
  let events: DomainEventBus;
  let eventsCaptor: EventsCaptor<PathologiesWarningsChange>;

  beforeEach(() => {
    events = new InMemoryDomainEventBus();
    eventsCaptor = new EventsCaptor(PathologiesWarningsChange, events);
  });

  afterEach(() => {
    warnings.close();
    eventsCaptor.close();
  });

  it('raise an event with selected pathologies warnings', () => {
    // Given
    const warns = new Map([
      [Pathology.CIRRHOTIQUE, [WARN1]],
      [Pathology.OH, [WARN1, WARN2, WARN3]],
    ]);
    warnings = new Warnings(new TestWarningsRead(new Map(), warns), events);

    // When
    const pathologies: Pathology[] = [Pathology.CIRRHOTIQUE, Pathology.OH];
    events.publish(new SelectedPathologiesEvent(pathologies))

    // Then
    eventsCaptor.expectEventsCount(1);
    const ws = eventsCaptor.mapSingleEvent(evt => evt.warnings);
    expect(ws).toEqual([WARN1, WARN2, WARN3]);
  })

  it('raise an event with selected pathologies warnings sorted by decreasing level', () => {
    // Given
    const warns = new Map([
      [Pathology.CIRRHOTIQUE, [WARN1]],
      [Pathology.OH, [HIGH_WARN, WARN2]],
    ]);
    warnings = new Warnings(new TestWarningsRead(new Map(), warns), events);

    // When
    const pathologies: Pathology[] = [Pathology.CIRRHOTIQUE, Pathology.OH];
    events.publish(new SelectedPathologiesEvent(pathologies))

    // Then
    eventsCaptor.expectEventsCount(1);
    const ws = eventsCaptor.mapSingleEvent(evt => evt.warnings);
    expect(ws).toEqual([HIGH_WARN, WARN1, WARN2]);
  })

});

describe('Warnings should', () => {

  let warnings: Warnings;
  let events: DomainEventBus;
  let eventsCaptor: EventsCaptor<ProductWarningsChange>;

  beforeEach(() => {
    events = new InMemoryDomainEventBus();
    eventsCaptor = new EventsCaptor(ProductWarningsChange, events);
  });

  afterEach(() => {
    warnings.close();
    eventsCaptor.close();
  });

  it('raise an event with selected product warnings sorted by decreasing level', () => {
    // Given
    const productWarns = new Map([
      ['product', [WARN1, HIGH_WARN, WARN2]],
    ]);
    warnings = new Warnings(new TestWarningsRead(new Map(), new Map(), productWarns), events);

    // When
    events.publish(new SelectedProductEvent('product'))

    // Then
    eventsCaptor.expectEventsCount(1);
    const ws = eventsCaptor.mapSingleEvent(evt => evt.warnings);
    expect(ws).toEqual([HIGH_WARN, WARN1, WARN2]);
  })

});

class TestWarningsRead implements WarningsRead {

  constructor(
    private nutritionistOpinionRequirements: Map<Pathology, WarningLevel> = new Map(),
    private warnings: Map<Pathology, Warning[]> = new Map(),
    private productsWarnings: Map<string, Warning[]> = new Map()) {
  }

  nutritionistOpinionRequirement(pathology: Pathology): WarningLevel {
    return this.nutritionistOpinionRequirements.get(pathology) ?? WarningLevel.NONE;
  }

  pathologyWarnings(pathology: Pathology): Warning[] {
    return this.warnings.get(pathology) ?? [];
  }

  productWarnings(product: string): Warning[] {
    return this.productsWarnings.get(product) ?? [];
  }
}
