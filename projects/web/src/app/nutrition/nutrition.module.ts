import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NutritionFormComponent} from "./nutrition-form/nutrition-form.component";
import {MatCardModule} from "@angular/material/card";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatExpansionModule} from "@angular/material/expansion";



@NgModule({
  declarations: [
    NutritionFormComponent,
  ],
  exports: [
    NutritionFormComponent
  ],
    imports: [
        CommonModule,
        MatCardModule,
        FontAwesomeModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatExpansionModule,
    ]
})
export class NutritionModule { }
