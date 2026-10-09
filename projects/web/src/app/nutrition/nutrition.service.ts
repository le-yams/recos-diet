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

import {Injectable, inject} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {
  SelectedNutritionTypeEvent,
  NutritionType,
  AvailableProductsEvent,
  SelectedProductEvent,
  DEFAULT_NUTRITION_TYPE
} from '@recos-diet/domain';
import {DomainService} from '../domain.service';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {

  private readonly nutrition;

  private readonly products;

  private readonly nutritionType = new BehaviorSubject<NutritionType>(DEFAULT_NUTRITION_TYPE);

  readonly nutritionType$ = this.nutritionType.asObservable();

  private readonly availableProducts = new BehaviorSubject<string[]>([]);

  readonly availableProducts$ = this.availableProducts.asObservable();

  private readonly selectedProduct = new BehaviorSubject<string | undefined>(undefined);

  readonly selectedProduct$ = this.selectedProduct.asObservable();

  constructor() {
    const domainService = inject(DomainService);

    this.products = domainService.products;
    this.nutrition = domainService.nutrition;
    this.nutritionType.next(this.nutrition.getSelectedNutritionType());
    this.selectedProduct.next(this.products.getSelectedProduct()?.name);
    this.availableProducts.next(this.products.listAvailableProducts().map(p => p.name));

    domainService.EventBus().subscribe(SelectedNutritionTypeEvent,
      evt => this.nutritionType.next(evt.selectedNutritionType));

    domainService.EventBus().subscribe(AvailableProductsEvent,
      evt => this.availableProducts.next(evt.availableProducts));

    domainService.EventBus().subscribe(SelectedProductEvent,
      evt => this.selectedProduct.next(evt.selectedProduct));

  }

  selectNutritionType(nutritionType: NutritionType) {
    this.nutrition.selectNutritionType(nutritionType);
  }

  selectProduct(product: string) {
    this.products.selectProduct(product);
  }
}
