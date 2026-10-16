/*
 * Copyright (c) 2026. Yann D'Isanto
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

import {NutritionInfo, ProductInfo, ProductNutritionRepository, Products, ProductsRepository} from './products';
import {NutritionType} from './nutrition';
import {SelectedNutritionTypeEvent} from './nutrition.events';
import {SelectedProductEvent} from './products.events';
import {Pathologies} from '../pathologies/pathologies';
import {Pathology} from '../pathologies/pathologies.data';
import {SelectedPathologiesEvent} from '../pathologies/pathologies.event';
import {PatientInfoUpdatedEvent} from '../patient/patient.events';
import {DomainEventBus} from '../domain.events';
import {EventsCaptor} from '../shared.spec';
import {InMemoryDomainEventBus} from '../in-memory-domain-event-bus';

// Extract of products.json: no product is compatible with both anorexia and EER with obesity.
const PRODUCTS: ProductInfo[] = [
  {name: 'Nutrison Protein Plus Energy', nutritionType: NutritionType.ENTERALE, compatibleWithAnorexia: false, compatibleWithEerObesity: false},
  {name: 'Peptamen HN', nutritionType: NutritionType.ENTERALE, compatibleWithAnorexia: false, compatibleWithEerObesity: false},
  {name: 'Sondalis Junior Standard', nutritionType: NutritionType.ENTERALE, compatibleWithAnorexia: true, compatibleWithEerObesity: false},
  {name: 'Nutrison Protein intense', nutritionType: NutritionType.ENTERALE, compatibleWithAnorexia: false, compatibleWithEerObesity: true},
  {name: 'Réanutriflex Omega N8 (Réa)', nutritionType: NutritionType.PARENTERALE, compatibleWithAnorexia: false, compatibleWithEerObesity: false},
  {name: 'Periolimel N4E', nutritionType: NutritionType.PARENTERALE, compatibleWithAnorexia: true, compatibleWithEerObesity: false},
  {name: 'SMOFKABIVEN PROTEINE N10 (Réa)', nutritionType: NutritionType.PARENTERALE, compatibleWithAnorexia: false, compatibleWithEerObesity: true},
];

class TestProductsRepository implements ProductsRepository, ProductNutritionRepository {

  read(): ProductInfo[] {
    return PRODUCTS;
  }

  productInfo(name: string): ProductInfo {
    const product = PRODUCTS.find(entity => entity.name === name);
    if (!product) {
      throw new Error(`Unknown product: ${name}`);
    }
    return product;
  }

  productIndications(): string {
    return '';
  }

  productNutritionInfo(): NutritionInfo {
    return {kcalPerLiter: 1000, proteinsGramsPerLiter: 50};
  }

  defaultEnteraleProduct(): string {
    return 'Nutrison Protein Plus Energy';
  }

  defaultParenteraleProduct(): string {
    return 'Réanutriflex Omega N8 (Réa)';
  }
}

describe('Products', () => {

  let events: DomainEventBus;
  let products: Products;

  beforeEach(() => {
    events = new InMemoryDomainEventBus();
    const repository = new TestProductsRepository();
    products = new Products(repository, repository, events);
    events.publish(new SelectedNutritionTypeEvent(NutritionType.ENTERALE));
  });

  function selectedProduct(): string | undefined {
    return products.getSelectedProduct()?.name;
  }

  function availableProducts(): string[] {
    return products.listAvailableProducts().map(product => product.name);
  }

  it('should select the default product of the nutrition type', () => {
    expect(selectedProduct()).toBe('Nutrison Protein Plus Energy');

    events.publish(new SelectedNutritionTypeEvent(NutritionType.PARENTERALE));

    expect(selectedProduct()).toBe('Réanutriflex Omega N8 (Réa)');
  });

  it('should list the products of the nutrition type', () => {
    expect(availableProducts()).toEqual([
      'Nutrison Protein Plus Energy', 'Peptamen HN', 'Sondalis Junior Standard', 'Nutrison Protein intense'
    ]);
  });

  it('should restore the last selected product of the nutrition type', () => {
    products.selectProduct('Peptamen HN');

    events.publish(new SelectedNutritionTypeEvent(NutritionType.PARENTERALE));
    events.publish(new SelectedNutritionTypeEvent(NutritionType.ENTERALE));

    expect(selectedProduct()).toBe('Peptamen HN');
  });

  it('should not publish when selecting the selected product', () => {
    const eventsCaptor = new EventsCaptor(SelectedProductEvent, events);

    products.selectProduct('Nutrison Protein Plus Energy');

    eventsCaptor.expectEventsCount(0);
    eventsCaptor.close();
  });

  it('should select a product compatible with anorexia', () => {
    events.publish(new SelectedPathologiesEvent([Pathology.ANOREXIE_MENTALE]));

    expect(availableProducts()).toEqual(['Sondalis Junior Standard']);
    expect(selectedProduct()).toBe('Sondalis Junior Standard');
  });

  it('should select a product compatible with EER and obesity', () => {
    events.publish(new SelectedPathologiesEvent([Pathology.CVVHDF, Pathology.OBESITE]));

    expect(availableProducts()).toEqual(['Nutrison Protein intense']);
    expect(selectedProduct()).toBe('Nutrison Protein intense');
  });

  it('should not filter products on EER without obesity', () => {
    events.publish(new SelectedPathologiesEvent([Pathology.CVVHDF]));

    expect(availableProducts()).toHaveSize(4);
    expect(selectedProduct()).toBe('Nutrison Protein Plus Energy');
  });

  it('should keep the selected product when no product is compatible', () => {
    events.publish(new SelectedPathologiesEvent([Pathology.ANOREXIE_MENTALE]));

    expect(() => events.publish(new SelectedPathologiesEvent([Pathology.ANOREXIE_MENTALE, Pathology.CVVHDF, Pathology.OBESITE])))
      .not.toThrow();

    expect(availableProducts()).toEqual([]);
    expect(selectedProduct()).toBe('Sondalis Junior Standard');
  });

  it('should not fail on a nutrition type without compatible product', () => {
    events.publish(new SelectedPathologiesEvent([Pathology.ANOREXIE_MENTALE, Pathology.CVVHDF, Pathology.OBESITE]));

    expect(() => events.publish(new SelectedNutritionTypeEvent(NutritionType.PARENTERALE))).not.toThrow();

    expect(availableProducts()).toEqual([]);
  });

  describe('with Pathologies', () => {

    let pathologies: Pathologies;

    beforeEach(() => {
      pathologies = new Pathologies(events);
    });

    it('should select the product compatible with EER and obesity when bmi reaches 30 with anorexia and EER', () => {
      pathologies.selectPathologies([Pathology.ANOREXIE_MENTALE, Pathology.CVVHDF]);
      expect(selectedProduct()).toBe('Sondalis Junior Standard');

      events.publish(new PatientInfoUpdatedEvent({heightCm: 170, weightKg: 100, bmi: 34.6, adjustedWeightKg: 79.2}));

      expect(pathologies.selectedPathologies).toEqual([Pathology.CVVHDF, Pathology.OBESITE]);
      expect(availableProducts()).toEqual(['Nutrison Protein intense']);
      expect(selectedProduct()).toBe('Nutrison Protein intense');
    });
  });

});
