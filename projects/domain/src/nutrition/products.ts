import {DEFAULT_NUTRITION_TYPE, NutritionType} from "./nutrition";
import {DomainEvents} from '../domain.events';
import {AvailableProductsEvent, SelectedProductNutritionInfoEvent, SelectedProductsEvent} from "./products.events";
import {SelectedNutritionTypeEvent} from "./nutrition.events";
import {SelectedPathologiesEvent} from "../pathologies/pathologies.event";


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

  private availableProducts: ProductInfo[] = [];

  constructor(private repository: ProductsRepository, private productNutritionRepository: ProductNutritionRepository) {
    DomainEvents.subscribe<SelectedNutritionTypeEvent>(SelectedNutritionTypeEvent.name,
      evt => this.nutritionTypeChanged(evt.selectedNutritionType));
    DomainEvents.subscribe<SelectedPathologiesEvent>(SelectedPathologiesEvent.name,
      evt => this.updatePatientAnorexiaStatus(evt.hasAnorexia()));
  }

  private nutritionTypeChanged(nutritionType: NutritionType) {
    this.selectedNutritionType = nutritionType;
    this.updateAvailableProducts(nutritionType, this.patientHasAnorexia);
    this.updateSelectedProductIfNecessary();
  }

  private updatePatientAnorexiaStatus(hasAnorexia: boolean) {
    this.patientHasAnorexia = hasAnorexia;
    this.updateAvailableProducts(this.selectedNutritionType, hasAnorexia);
    this.updateSelectedProductIfNecessary();
  }

  private updateAvailableProducts(nutritionType: NutritionType, hasAnorexia: boolean) {
    const products = this.repository.read()
      .filter(product => product.nutritionType === nutritionType)
      .filter(product => product.compatibleWithAnorexia || !hasAnorexia);
    this.availableProducts = products;
    DomainEvents.publish(new AvailableProductsEvent(products.map(product => product.name)));
  }

  private updateSelectedProductIfNecessary() {
    const nutritionType = this.selectedNutritionType;
    if (this.selectedProductIsNotCompatibleWith(nutritionType)) {
      const compatibleProduct = this.lastSelectedProducts.get(nutritionType) ?? this.defaultProductFor(nutritionType);
      this.selectProduct(compatibleProduct);
    } else if (this.patientHasAnorexia && !this.selectedProduct?.compatibleWithAnorexia) {
      const compatibleProduct = this.availableProducts.find(p => p.compatibleWithAnorexia)!;
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
    DomainEvents.publish(new SelectedProductsEvent(productName));
    const nutritionInfo = this.productNutritionRepository.productNutritionInfo(productName);
    DomainEvents.publish(new SelectedProductNutritionInfoEvent(nutritionInfo));
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
      ...product,
      indications: this.repository.productIndications(product.name),
      nutritionInfo: this.productNutritionRepository.productNutritionInfo(product.name)
    };
  }
}
