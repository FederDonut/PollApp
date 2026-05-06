import { Component, signal } from '@angular/core';
import { QuestionForm } from '../question-form/question-form';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey-form',
  imports: [ReactiveFormsModule, QuestionForm],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.scss',
})
export class SurveyForm {
  questions = signal<number[]>([]);
  isHoverd: boolean = false;
  isStraight: boolean = false;

  toggleCategory() {
    console.log('connect');
  }

  addNextQuestion() {
    this.questions.update((current) => [...current, current.length]);

    if (this.isStraight === true) {
      this.isStraight = false;
    } else {
      this.isStraight = true;
    }
    console.log(this.isStraight);
  }
  //outsourcing in service
  surveyForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required, Validators.minLength(4)] }),
    endDate: new FormControl('', { validators: [Validators.required] }),
  });
}
