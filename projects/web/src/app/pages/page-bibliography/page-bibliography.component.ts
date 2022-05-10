import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DomainService} from "../../domain.service";
import {faBookMedical} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from "@angular/router";
import {BibliographyEntry, Verbose} from '@recos-diet/domain';

@Component({
  selector: 'app-page-bibliography',
  templateUrl: './page-bibliography.component.html',
  styleUrls: ['./page-bibliography.component.css']
})
export class PageBibliographyComponent implements OnInit, AfterViewInit {

  bibliography;
  faBookMedical = faBookMedical;
  highlightedIndex?: number = undefined;

  constructor(private activatedRoute: ActivatedRoute, domainService: DomainService) {
    this.bibliography = domainService.bibliography;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const index: string = params['index'];
      this.highlightedIndex = parseInt(index);
      Verbose.log('highlighted bibliography index:', index);
    });
  }

  ngAfterViewInit(): void {
    if (this.highlightedIndex) {
      document.getElementById('bibliography-' + this.highlightedIndex)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  }

  isHighlighted(entry: BibliographyEntry) {
    return entry.index === this.highlightedIndex;
  }
}
