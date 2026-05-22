import { Component } from '@angular/core';
import { SurveyForm } from '../forms/survey-form/survey-form';

@Component({
  selector: 'app-survey',
  imports: [SurveyForm],
  templateUrl: './survey.html',
  styleUrl: './survey.scss',
})
export class Survey {
  //publish: boolean = false;
  submit: boolean = false;

  publishNewSurvey() {
    if (!this.submit) {
      this.submit = true;
    }
    return this.submit;
  }
}
