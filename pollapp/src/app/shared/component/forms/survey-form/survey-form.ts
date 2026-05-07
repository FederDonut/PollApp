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
  questions = signal<number[]>([0]);

  isHoverd: boolean = false;

  ngOnInit() {}
  toggleCategory() {
    console.log('connect');
    console.log(this.questions());
  }

  addNextQuestion() {
    this.questions.update((current) => [...current, current.length]);
  }
  removeQuestionObject(index: number) {
    console.log(this.questions().indexOf(index));
  }
  //outsourcing in service
  surveyForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required, Validators.minLength(4)] }),
    endDate: new FormControl('', { validators: [Validators.required] }),
  });
}
