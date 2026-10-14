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

import {DEFAULT_NUTRITION_TYPE, NutritionType} from './nutrition';
import {DomainEventBus} from '../domain.events';
import {AvailableProductsEvent, SelectedProductNutritionInfoEvent, SelectedProductEvent} from './products.events';
import {SelectedNutritionTypeEvent} from './nutrition.events';
import {SelectedPathologiesEvent} from '../pathologies/pathologies.event';


export interface NutritionInfo {
  kcalPerLiter: number
  proteinsGramsPerLiter: number
}

export interface ProductNutritionRead {

  productNutritionInfo(productName: string): NutritionInfo

}

export type ProductNutritionRepository =
  | ProductNutritionRead

export interface ProductInfo {
  name: string
  nutritionType: NutritionType
  compatibleWithAnorexia: boolean
  compatibleWithEerObesity: boolean
}

export interface ProductDetail {
  name: string
  indications: string
  nutritionType: NutritionType
  nutritionInfo: NutritionInfo
}

export interface ProductsRead {

  read(): ProductInfo[]

  productInfo(name: string): ProductInfo

  productIndications(name: string): string

  defaultEnteraleProduct(): string;

  defaultParenteraleProduct(): string;
}

export type ProductsRepository =
  | ProductsRead

export class Products {

  private selectedNutritionType: NutritionType = DEFAULT_NUTRITION_TYPE;

  private selectedProduct?: ProductInfo;

  private lastSelectedProducts = new Map<NutritionType, string | undefined>();

  private patientHasAnorexia = false;

  private patientHasEerObesity = false;

  private availableProducts: ProductInfo[] = [];

  constructor(private repository: ProductsRepository, private productNutritionRepository: ProductNutritionRepository, private events: DomainEventBus) {
    this.events.subscribe(SelectedNutritionTypeEvent,
      evt => this.nutritionTypeChanged(evt.selectedNutritionType));
    this.events.subscribe(SelectedPathologiesEvent,
      evt => this.updatePatientPathologiesStatus(evt));
  }

  private nutritionTypeChanged(nutritionType: NutritionType) {
    this.selectedNutritionType = nutritionType;
    this.updateAvailableProducts(nutritionType, this.patientHasAnorexia, this.patientHasEerObesity);
    this.updateSelectedProductIfNecessary();
  }

  private updatePatientPathologiesStatus(event: SelectedPathologiesEvent) {
    const hasAnorexia = event.hasAnorexia();
    const hasEerObesity = event.hasEerObesity();
    this.patientHasAnorexia = hasAnorexia;
    this.patientHasEerObesity = hasEerObesity;
    this.updateAvailableProducts(this.selectedNutritionType, hasAnorexia, hasEerObesity);
    this.updateSelectedProductIfNecessary();
  }

  private updateAvailableProducts(nutritionType: NutritionType, hasAnorexia: boolean, hasEerObesity: boolean) {
    const products = this.repository.read()
      .filter(product => product.nutritionType === nutritionType)
      .filter(product => product.compatibleWithAnorexia || !hasAnorexia)
      .filter(product => product.compatibleWithEerObesity || !hasEerObesity);
    this.availableProducts = products;
    this.events.publish(new AvailableProductsEvent(products.map(product => product.name)));
  }

  /**
   * Keeps the selected product when no available product is compatible.
   */
  private updateSelectedProductIfNecessary() {
    const nutritionType = this.selectedNutritionType;
    let compatibleProduct: ProductInfo | undefined;
    if (this.selectedProductIsNotCompatibleWith(nutritionType)) {
      const lastSelectedProduct = this.lastSelectedProducts.get(nutritionType) ?? this.defaultProductFor(nutritionType);
      compatibleProduct = this.availableProducts.find(p => p.name === lastSelectedProduct) ?? this.availableProducts[0];
    } else if (this.patientHasAnorexia && !this.selectedProduct?.compatibleWithAnorexia) {
      compatibleProduct = this.availableProducts.find(p => p.compatibleWithAnorexia);
    } else if (this.patientHasEerObesity && !this.selectedProduct?.compatibleWithEerObesity) {
      compatibleProduct = this.availableProducts.find(p => p.compatibleWithEerObesity);
    }
    if (compatibleProduct) {
      this.updateSelectedProduct(compatibleProduct);
    }
  }

  private defaultProductFor(nutritionType: NutritionType): string {
    return nutritionType == NutritionType.ENTERALE ?
      this.repository.defaultEnteraleProduct() :
      this.repository.defaultParenteraleProduct();
  }

  private selectedProductIsNotCompatibleWith(nutritionType: NutritionType) {
    if (this.selectedProduct) {
      return this.selectedProduct.nutritionType !== nutritionType;
    } else {
      return true;
    }
  }

  public selectProduct(product: string) {
    if (product !== this.selectedProduct?.name) {
      const productInfo = this.repository.productInfo(product);
      this.updateSelectedProduct(productInfo);
    }
  }

  private updateSelectedProduct(product: ProductInfo) {
    this.selectedProduct = product;
    const productName = product.name;
    this.lastSelectedProducts.set(product.nutritionType, productName);
    this.events.publish(new SelectedProductEvent(productName));
    const nutritionInfo = this.productNutritionRepository.productNutritionInfo(productName);
    this.events.publish(new SelectedProductNutritionInfoEvent(nutritionInfo));
  }

  public getSelectedProduct(): ProductInfo | undefined {
    return this.selectedProduct;
  }

  public listAvailableProducts(): ProductInfo[] {
    return this.availableProducts;
  }

  public listAllProducts(): ProductDetail[] {
    return this.repository.read().map(product => this.productDetail(product));
  }

  private productDetail(product: ProductInfo): ProductDetail {
    return {
      name: product.name,
      nutritionType: product.nutritionType,
      indications: this.repository.productIndications(product.name),
      nutritionInfo: this.productNutritionRepository.productNutritionInfo(product.name)
    };
  }
}
