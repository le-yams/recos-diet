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

export interface BibliographyEntry {
  reference: string
  index: number
  label: string
  url?: string
}

export class BibliographyEntries {

  private readonly entries;

  constructor(entries: BibliographyEntry[]) {
    this.entries = entries.sort((e1, e2) => e1.index - e2.index);
  }

  sortedByIndex(): BibliographyEntry[] {
    return [...this.entries];
  }
}

export const EMPTY_BIBLIOGRAPHY = new BibliographyEntries([])

export interface BibliographyRepositoryRead {

  read(): BibliographyEntry[]
}

export type BibliographyRepository =
  | BibliographyRepositoryRead


export class Bibliography {

  constructor(private repository: BibliographyRepository) {
  }

  entriesForReferences(...references: string[]): BibliographyEntries {
    return new BibliographyEntries(
      this.repository.read()
        .filter(entry => references.includes(entry.reference))
    )
  }

  allEntries(): BibliographyEntries {
    return new BibliographyEntries(this.repository.read());
  }

}


