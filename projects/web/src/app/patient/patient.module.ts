import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PatientFormComponent} from './patient-form/patient-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BibliographyModule} from '../bibliography/bibliography.module';
import {MatExpansionModule} from "@angular/material/expansion";


@NgModule({
  declarations: [
    PatientFormComponent
  ],
  exports: [
    PatientFormComponent
  ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        FontAwesomeModule,
        BibliographyModule,
        MatExpansionModule
    ]
})
export class PatientModule {
}
