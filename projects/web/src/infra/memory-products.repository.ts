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

import {NutritionInfo, ProductInfo, ProductNutritionRepository, ProductsRepository} from '@recos-diet/domain';

export class MemoryProductsRepository implements ProductsRepository, ProductNutritionRepository {

  constructor(private jsonProducts: JsonProducts) {
  }

  private productEntities(): ProductInfoEntity[] {
    return this.jsonProducts.products;
  }

  private productEntity(name: string): ProductInfoEntity {
    const product = this.productEntities().find(entity => entity.name === name);
    if (!product) {
      throw new Error(`Unknown product: ${name}`);
    }
    return product;
  }

  read(): ProductInfo[] {
    return this.productEntities();
  }

  productInfo(name: string): ProductInfo {
    return this.productEntity(name);
  }

  productIndications(name: string): string {
    return this.productEntity(name).indications;
  }

  productNutritionInfo(productName: string): NutritionInfo {
    return this.productEntity(productName);
  }

  defaultEnteraleProduct(): string {
    return this.jsonProducts.defaultEnteraleProduct;
  }

  defaultParenteraleProduct(): string {
    return this.jsonProducts.defaultParenteraleProduct;
  }

}

export interface ProductInfoEntity extends ProductInfo, NutritionInfo {
  indications: string
}

export interface JsonProducts {
  defaultEnteraleProduct: string
  defaultParenteraleProduct: string
  products: ProductInfoEntity[]
}
