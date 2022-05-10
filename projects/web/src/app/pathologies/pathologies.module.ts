import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathologiesComponent } from './pathologies/pathologies.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {WarningsComponent} from "./warnings/warnings.component";
import {BibliographyModule} from "../bibliography/bibliography.module";



@NgModule({
  declarations: [
    PathologiesComponent,
    WarningsComponent,
  ],
  exports: [
    PathologiesComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    FontAwesomeModule,
    MatCheckboxModule,
    MatExpansionModule,
    BibliographyModule
  ]
})
export class PathologiesModule { }
