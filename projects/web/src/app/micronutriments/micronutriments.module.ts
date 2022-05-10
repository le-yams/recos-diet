import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicronutrimentsComponent } from './micronutriments.component';
import {BibliographyModule} from "../bibliography/bibliography.module";



@NgModule({
  declarations: [
    MicronutrimentsComponent,
  ],
  exports: [
    MicronutrimentsComponent
  ],
  imports: [
    CommonModule,
    BibliographyModule
  ]
})
export class MicronutrimentsModule { }
