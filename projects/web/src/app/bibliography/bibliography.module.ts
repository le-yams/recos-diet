import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BiblioLinksComponent} from './biblio-links/biblio-links.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    BiblioLinksComponent,
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule
    ],
  exports: [
    BiblioLinksComponent
  ]
})
export class BibliographyModule {
}
