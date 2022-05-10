import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageBibliographyComponent} from "./pages/page-bibliography/page-bibliography.component";
import {PageAboutComponent} from "./pages/page-about/page-about.component";
import {PageSriComponent} from "./pages/page-sri/page-sri.component";
import {PageDenutritionComponent} from "./pages/page-denutrition/page-denutrition.component";
import {PageHomeComponent} from './pages/page-home/page-home.component';
import {PageProductsComponent} from './pages/page-products/page-products.component';
import {PagePhosphorusComponent} from "./pages/page-phosphorus/page-phosphorus.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
