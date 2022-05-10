import { Injectable } from '@angular/core';
import {BibliographyEntry, BibliographyRepository} from "@recos-diet/domain";

export class MemoryBibliographyRepository implements BibliographyRepository {

  constructor(private entries: BibliographyEntry[]) {
  }

  read(): BibliographyEntry[] {
    return this.entries;
  }
}
