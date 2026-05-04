import { Component } from '@angular/core';
import { QuestionForm } from '../question-form/question-form';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey-form',
  imports: [ReactiveFormsModule, QuestionForm],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.scss',
})
export class SurveyForm {
  isHoverd: boolean = false;

  surveyForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required, Validators.minLength(4)] }),
    endDate: new FormControl('', { validators: [Validators.required] }),
  });
}
