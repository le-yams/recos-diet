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

import {NutritionType} from '@recos-diet/domain';
import {MemoryProductsRepository} from './memory-products.repository';

describe('MemoryProductsRepository', () => {

  const repository = new MemoryProductsRepository({
    defaultEnteraleProduct: 'Peptamen HN',
    defaultParenteraleProduct: 'Periolimel N4E',
    products: [{
      name: 'Peptamen HN',
      nutritionType: NutritionType.ENTERALE,
      compatibleWithAnorexia: false,
      compatibleWithEerObesity: false,
      kcalPerLiter: 1330,
      proteinsGramsPerLiter: 66,
      indications: ''
    }]
  });

  it('should find a product by name', () => {
    expect(repository.productInfo('Peptamen HN').name).toBe('Peptamen HN');
  });

  it('should reject an unknown product', () => {
    expect(() => repository.productInfo('Inconnu')).toThrowError('Unknown product: Inconnu');
    expect(() => repository.productNutritionInfo('Inconnu')).toThrowError('Unknown product: Inconnu');
  });

});
