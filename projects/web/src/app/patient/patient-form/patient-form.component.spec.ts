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

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MATERIAL_ANIMATIONS} from '@angular/material/core';
import {Bibliography, Patient} from '@recos-diet/domain';
import {DomainService} from '../../domain.service';
import {PatientFormComponent} from './patient-form.component';

describe('PatientFormComponent', () => {
  let fixture: ComponentFixture<PatientFormComponent>;
  let patient: Patient;

  beforeEach(async () => {
    patient = new Patient({publish: () => undefined, subscribe: () => ({unsubscribe: () => undefined})});
    await TestBed.configureTestingModule({
      imports: [PatientFormComponent],
      providers: [
        // bibliography: an overweight patient shows the adjusted weight and its references (app-biblio-links)
        {provide: DomainService, useValue: {patient, bibliography: new Bibliography({read: () => []})}},
        {provide: MATERIAL_ANIMATIONS, useValue: {animationsDisabled: true}},
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(PatientFormComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  async function type(name: string, value: string): Promise<void> {
    const input: HTMLInputElement = fixture.nativeElement.querySelector(`input[name=${name}]`);
    input.dispatchEvent(new Event('focus'));
    input.value = value;
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('change'));
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  const errors = () => Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('mat-error'))
    .map(e => e.textContent!.trim());

  it('should update patient size with valid values', async () => {
    await type('height', '180');
    await type('weight', '82.5');
    expect(patient.heightCm).toBe(180);
    expect(patient.weightKg).toBe(82.5);
    expect(errors()).toEqual([]);
  });

  [
    {name: 'height', value: '', message: 'Taille attendue entre 100 et 300 cm'},
    {name: 'height', value: '17', message: 'Taille attendue entre 100 et 300 cm'},
    {name: 'weight', value: '', message: 'Poids attendu entre 10 et 700 kg'},
    {name: 'weight', value: '0.5', message: 'Poids attendu entre 10 et 700 kg'},
  ].forEach(param => {
    it(`should keep patient size and show an error when ${param.name} is '${param.value}'`, async () => {
      await type(param.name, param.value);
      expect(patient.heightCm).toBe(170);
      expect(patient.weightKg).toBe(70);
      expect(errors()).toEqual([param.message]);
      expect(fixture.nativeElement.querySelector('mat-panel-description').textContent).not.toContain('NaN');
    });
  });
});
