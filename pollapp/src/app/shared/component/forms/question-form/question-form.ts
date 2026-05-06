import { Component, output, input, signal } from '@angular/core';

@Component({
  selector: 'app-question-form',
  imports: [],
  templateUrl: './question-form.html',
  styleUrl: './question-form.scss',
})
export class QuestionForm {
  answers = signal<number[]>([]);
  questionId = input<number>(1);

  addAnswer() {
    //let currentID: number = this.questionId();
    //console.log(currentID);
    this.answers.update((currentAnswer) => [...currentAnswer, currentAnswer.length]);
    console.log(this.answers());
  }
}
