import { Component, output, input, signal, inject } from '@angular/core';
import { AnswerInterface } from '../../../interfaces/survey';
import { floor } from 'firebase/firestore/pipelines';

@Component({
  selector: 'app-question-form',
  imports: [],
  templateUrl: './question-form.html',
  styleUrl: './question-form.scss',
})
export class QuestionForm {
  interface = signal<AnswerInterface[]>([{ id: 'A', text: '' }]);
  answers = signal<number[]>([0, 1]);
  questionId = input<number>(1);

  visible: boolean = true;

  AnswerId = ['A', 'B', 'C', 'D', 'E', 'F'];

  hideButton() {
    if (this.answers().length >= 6) {
      this.visible = true;
      return 'none';
    } else {
      this.visible = false;
      return '';
    }
  }
  addAnswer() {
    this.answers.update((currentAnswer) => [...currentAnswer, currentAnswer.length]);
    console.log(this.answers());
    this.hideButton();
  }

  deleteAnswer(index: number) {
    // Interface zu aller erst implemntieren.

    this.answers.update((current) => {
      const newAnswers = [];
      for (let i = 0; i < current.length; i++) {
        if (i !== index) {
          newAnswers.push(current[i]);
        }
      }
      return newAnswers;
    });
    console.log(this.answers());
    //console.log(this.questionId());
  }
}
