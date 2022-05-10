import {Component} from '@angular/core';
import {TargetFlowsService} from "./target-flows.service";
import {Observable} from "rxjs";
import {TargetFlow} from "../../../../domain/src/target-flows/target-flows";

@Component({
  selector: 'app-target-flows',
  templateUrl: './target-flows.component.html',
  styleUrls: ['./target-flows.component.css']
})
export class TargetFlowsComponent {

  readonly targetFlows$: Observable<TargetFlow[]>;

  readonly reg = /[.,]0+$/;

  constructor(targetFlowsService: TargetFlowsService) {
    this.targetFlows$ = targetFlowsService.targetFlows$;
  }

}
