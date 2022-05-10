import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TargetFlowsComponent } from './target-flows.component';
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    TargetFlowsComponent
  ],
  exports: [
    TargetFlowsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class TargetFlowsModule { }
