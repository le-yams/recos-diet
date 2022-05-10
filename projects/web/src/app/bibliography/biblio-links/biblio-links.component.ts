import {Component, Input, OnInit} from '@angular/core';
import {Bibliography, BibliographyEntries, EMPTY_BIBLIOGRAPHY} from '@recos-diet/domain';
import {DomainService} from "../../domain.service";

@Component({
  selector: 'app-biblio-links',
  templateUrl: './biblio-links.component.html',
  styleUrls: ['./biblio-links.component.css']
})
export class BiblioLinksComponent implements OnInit {

  @Input() references!: Array<string>;

  bibliography: Bibliography;

  bibliographyEntries: BibliographyEntries = EMPTY_BIBLIOGRAPHY;

  constructor(private domainService: DomainService) {
    this.bibliography = this.domainService.bibliography;
  }

  ngOnInit(): void {
    this.bibliographyEntries = this.bibliography.entriesForReferences(...this.references);
  }

}
