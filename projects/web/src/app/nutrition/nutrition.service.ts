import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {
  DomainEvents,
  SelectedNutritionTypeEvent,
  NutritionType,
  AvailableProductsEvent,
  SelectedProductsEvent,
  DEFAULT_NUTRITION_TYPE
} from "@recos-diet/domain";
import {DomainService} from "../domain.service";

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

  constructor(domainService: DomainService) {
    this.products = domainService.products;
    this.nutrition = domainService.nutrition;
    this.nutritionType.next(this.nutrition.getSelectedNutritionType());
    this.selectedProduct.next(this.products.getSelectedProduct()?.name);
    this.availableProducts.next(this.products.listAvailableProducts().map(p => p.name));

    DomainEvents.subscribe<SelectedNutritionTypeEvent>(SelectedNutritionTypeEvent.name,
      evt => this.nutritionType.next(evt.selectedNutritionType));

    DomainEvents.subscribe<AvailableProductsEvent>(AvailableProductsEvent.name,
      evt => this.availableProducts.next(evt.availableProducts));

    DomainEvents.subscribe<SelectedProductsEvent>(SelectedProductsEvent.name,
      evt => this.selectedProduct.next(evt.selectedProduct));

  }

  selectNutritionType(nutritionType: NutritionType) {
    this.nutrition.selectNutritionType(nutritionType);
  }

  selectProduct(product: string) {
    this.products.selectProduct(product);
  }
}
