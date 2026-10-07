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

import {DomainEvent} from '../domain.events';
import {NutritionInfo} from './products';

export class AvailableProductsEvent implements DomainEvent {

  readonly name = AvailableProductsEvent.name;

  constructor(public readonly availableProducts: string[]) {
  }

}

export class SelectedProductEvent implements DomainEvent {

  readonly name = SelectedProductEvent.name;

  constructor(public readonly selectedProduct: string) {
  }

}

export class SelectedProductNutritionInfoEvent implements DomainEvent {

  readonly name = SelectedProductNutritionInfoEvent.name;

  constructor(public readonly selectedProductProductNutritionInfo: NutritionInfo) {
  }

}
