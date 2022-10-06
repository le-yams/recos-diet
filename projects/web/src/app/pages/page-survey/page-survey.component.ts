import {Component, Input, OnInit, SecurityContext} from '@angular/core';
import {NoSurvey, Survey, SurveyService} from "../../survey/survey.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-page-survey',
  templateUrl: './page-survey.component.html',
  styleUrls: ['./page-survey.component.css']
})
export class PageSurveyComponent implements OnInit {

  noSurvey = NoSurvey;
  survey$: Promise<Survey> = Promise.resolve(NoSurvey);
  readonly resourceUrlSecurityContext = SecurityContext.RESOURCE_URL

  constructor(private survey: SurveyService, public domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.survey$ = this.survey.get();
  }

}
