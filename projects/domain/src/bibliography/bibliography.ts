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


