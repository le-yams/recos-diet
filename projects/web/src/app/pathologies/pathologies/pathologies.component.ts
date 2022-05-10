import {Component} from '@angular/core';
import {faExclamationCircle, faDisease} from '@fortawesome/free-solid-svg-icons';
import {Pathology} from "@recos-diet/domain";
import {Observable} from "rxjs";
import {PathologiesService} from "../pathologies.service";
import {map} from "rxjs/operators";
import {WarningsService} from "../warnings/warnings.service";

@Component({
  selector: 'app-pathologies',
  templateUrl: './pathologies.component.html',
  styleUrls: ['./pathologies.component.css']
})
export class PathologiesComponent {

  faDisease = faDisease;
  faExclamationCircle = faExclamationCircle;

  allPathologies: Pathology[];
  selectedPathologies$: Observable<Pathology[]>;

  readonly hasWarnings$: Observable<boolean>;

  constructor(private pathologyService: PathologiesService, warningsService: WarningsService) {
    this.selectedPathologies$ = this.pathologyService.selectedPathologies$;
    this.hasWarnings$ = warningsService.warnings$.pipe(
      map(warnings => warnings.length > 0)
    );
    this.allPathologies = Object.values(Pathology);
  }

  isObesity(pathology: Pathology) {
    return pathology === Pathology.OBESITE
  }

  isSelected(pathology: Pathology): Observable<boolean> {
    return this.selectedPathologies$.pipe(
      map(pathologies => pathologies.includes(pathology))
    )
  }

  pathologySelectionChange(pathology: Pathology, selected: boolean) {
    if (selected) {
      this.pathologyService.selectPathology(pathology);
    } else {
      this.pathologyService.unselectPathology(pathology);
    }
  }
}
