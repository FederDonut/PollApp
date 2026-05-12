import { Component, signal } from '@angular/core';
import { QuestionForm } from '../question-form/question-form';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionInterface } from '../../../interfaces/survey';

@Component({
  selector: 'app-survey-form',
  imports: [ReactiveFormsModule, QuestionForm],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.scss',
})
export class SurveyForm {
  questionCount: number = 1;
  questions = signal<QuestionInterface[]>([
    { id: this.questionCount, questionText: '', allowMultipleAnsers: false, answers: [] },
  ]);
  isHoverd: boolean = false;
  questionCataloge: QuestionInterface[][] = [];

  ngOnInit() {}

  toggleCategory() {
    console.log('connect');
    console.log(this.questions());
  }

  addNextQuestion() {
    this.questionCount++;
    const newQuestion: QuestionInterface = {
      id: this.questionCount,
      questionText: '',
      allowMultipleAnsers: false,
      answers: [],
    };
    this.questions.update((currentQuestion) => [...currentQuestion, newQuestion]);

    console.log('Anzahl der Fragen: ', this.questions());
    //this.questionCataloge.push(this.questions());
    //console.log('FrageKatalog:', this.questionCataloge);
  }

  // id müssen wieder angepasst werden --> ngOnInit()
  deleteWholeQuestion(id: number) {
    //console.log('Frage:', id, ' soll gelöscht werden ');
    this.questions.update((currentQ) => {
      console.log(currentQ);
      return currentQ.filter((question) => question.id !== id);
    });

    console.log('Fragen die übrig geblieben sind: ', this.questions());
  }

  //outsourcing in service
  surveyForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required, Validators.minLength(4)] }),
    endDate: new FormControl('', { validators: [Validators.required] }),
  });
}
