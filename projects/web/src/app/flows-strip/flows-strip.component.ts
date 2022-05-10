import {Component} from '@angular/core';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import {DomainService} from "../domain.service";
import {PathologiesService} from "../pathologies/pathologies.service";
import {Pathology} from "../../../../domain/src/pathologies/pathologies.data";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-flows-strip',
  templateUrl: './flows-strip.component.html',
  styleUrls: ['./flows-strip.component.css']
})
export class FlowsStripComponent {

  faAngleDoubleRight = faAngleDoubleRight;

  hasObesity$: Observable<boolean>

  constructor(private pathologiesService: PathologiesService) {
    this.hasObesity$ = pathologiesService.selectedPathologies$.pipe(
      map(pathologies => pathologies.includes(Pathology.OBESITE))
    );
  }

}
