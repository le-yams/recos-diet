import {NutritionInfo, ProductInfo, ProductNutritionRepository, ProductsRepository} from "@recos-diet/domain";

export class MemoryProductsRepository implements ProductsRepository, ProductNutritionRepository {

  constructor(private jsonProducts: JsonProducts) {
  }

  private productEntities(): ProductInfoEntity[] {
    return this.jsonProducts.products;
  }

  private productEntity(name: string): ProductInfoEntity {
    return this.productEntities()
      .filter(product => product.name === name)
      .pop()!;
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
