import {Component} from '@angular/core';
import {faUtensils} from '@fortawesome/free-solid-svg-icons';
import {NutritionType} from "@recos-diet/domain";
import {NutritionService} from "../nutrition.service";


@Component({
  selector: 'app-nutrition-form',
  templateUrl: './nutrition-form.component.html',
  styleUrls: ['./nutrition-form.component.css']
})
export class NutritionFormComponent {

  faUtensils = faUtensils;
  enterale = NutritionType.ENTERALE
  parenterale = NutritionType.PARENTERALE

  selectedNutritionType$;
  availableProduct$;
  selectedProduct$;

  constructor(private nutritionService: NutritionService) {
    this.availableProduct$ = nutritionService.availableProducts$;
    this.selectedNutritionType$ = nutritionService.nutritionType$;
    this.selectedProduct$ = nutritionService.selectedProduct$;
  }

  selectNutritionType(value: NutritionType) {
    this.nutritionService.selectNutritionType(value)
  }

  async selectProduct(value: string) {
    await this.nutritionService.selectProduct(value);
  }
}
