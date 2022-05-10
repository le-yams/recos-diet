import {DomainEvent} from '../domain.events';
import {NutritionInfo} from "./products";

export class AvailableProductsEvent implements DomainEvent {

  readonly name = AvailableProductsEvent.name;

  constructor(public readonly availableProducts: string[]) {
  }

}

export class SelectedProductsEvent implements DomainEvent {

  readonly name = SelectedProductsEvent.name;

  constructor(public readonly selectedProduct: string) {
  }

}

export class SelectedProductNutritionInfoEvent implements DomainEvent {

  readonly name = SelectedProductNutritionInfoEvent.name;

  constructor(public readonly selectedProductProductNutritionInfo: NutritionInfo) {
  }

}
