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

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageBibliographyComponent} from "./pages/page-bibliography/page-bibliography.component";
import {PageAboutComponent} from "./pages/page-about/page-about.component";
import {PageSriComponent} from "./pages/page-sri/page-sri.component";
import {PageDenutritionComponent} from "./pages/page-denutrition/page-denutrition.component";
import {PageHomeComponent} from './pages/page-home/page-home.component';
import {PageProductsComponent} from './pages/page-products/page-products.component';
import {PagePhosphorusComponent} from "./pages/page-phosphorus/page-phosphorus.component";
import {PageSurveyComponent} from "./pages/page-survey/page-survey.component";

const routes: Routes = [
  {
    path: '', component: PageHomeComponent, pathMatch: 'full'
  },
  {
    path: 'phosphorus', component: PagePhosphorusComponent, pathMatch: 'full'
  },
  {
    path: 'sri', component: PageSriComponent, pathMatch: 'full'
  },
  {
    path: 'denutrition', component: PageDenutritionComponent, pathMatch: 'full'
  },
  {
    path: 'bibliography', component: PageBibliographyComponent, pathMatch: 'full'
  },
  {
    path: 'products', component: PageProductsComponent, pathMatch: 'full'
  },
  {
    path: 'about', component: PageAboutComponent, pathMatch: 'full'
  },
  {
    path: 'survey', component: PageSurveyComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
