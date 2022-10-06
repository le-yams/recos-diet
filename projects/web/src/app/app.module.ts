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

import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BibliographyModule} from './bibliography/bibliography.module';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {PatientModule} from './patient/patient.module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NutritionModule} from "./nutrition/nutrition.module";
import {PathologiesModule} from "./pathologies/pathologies.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {FlowsStripComponent} from './flows-strip/flows-strip.component';
import {TargetFlowsModule} from "./target-flows/target-flows.module";
import {MatCardModule} from "@angular/material/card";
import {DomainLoaderService} from "./infra/domain-loader.service";
import {DisclaimerComponent} from './disclaimer/disclaimer.component';
import {PageBibliographyComponent} from './pages/page-bibliography/page-bibliography.component';
import {FooterComponent} from './footer/footer.component';
import {PageAboutComponent} from './pages/page-about/page-about.component';
import {MatChipsModule} from "@angular/material/chips";
import {PageSriComponent} from './pages/page-sri/page-sri.component';
import {PageDenutritionComponent} from './pages/page-denutrition/page-denutrition.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MicronutrimentsModule} from "./micronutriments/micronutriments.module";
import {PageHomeComponent} from './pages/page-home/page-home.component';
import {PageProductsComponent} from './pages/page-products/page-products.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {ProductDetailComponent} from './pages/page-products/product-detail/product-detail.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { PagePhosphorusComponent } from './pages/page-phosphorus/page-phosphorus.component';
import { PageSurveyComponent } from './pages/page-survey/page-survey.component';

export function loadDomain(domainLoader: DomainLoaderService) {
  return () => {
    return domainLoader.load();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    FlowsStripComponent,
    DisclaimerComponent,
    PageBibliographyComponent,
    FooterComponent,
    PageAboutComponent,
    PageSriComponent,
    PageDenutritionComponent,
    PageHomeComponent,
    PageProductsComponent,
    ProductDetailComponent,
    PagePhosphorusComponent,
    PageSurveyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    MatButtonModule,
    BibliographyModule,
    PatientModule,
    NutritionModule,
    PathologiesModule,
    MatGridListModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    TargetFlowsModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    FormsModule,
    MicronutrimentsModule,
    MatTableModule,
    MatSortModule,
    MatExpansionModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    DomainLoaderService,
    {provide: APP_INITIALIZER, useFactory: loadDomain, deps: [DomainLoaderService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
