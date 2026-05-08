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
  AnswerId: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];

  //interface = signal<AnswerInterface[]>([{ id: 'A', text: '' }]);
  //answers = signal<number[]>([0, 1]);
  answers = signal<AnswerInterface[]>([
    { id: 'id-' + 0, text: '' },
    { id: 'id-' + 1, text: '' },
  ]);
  questionId = input<number>(1);

  visible: boolean = true;
  counter: number = 2;

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
    //this.answers.update((currentAnswer) => [...currentAnswer, currentAnswer.length]);

    const newAnswers: AnswerInterface = {
      id: 'id-' + this.counter++,
      text: '',
    };
    this.answers.update((currentAnswer) => [...currentAnswer, newAnswers]);
    console.log(this.answers());
    this.hideButton();
  }

  deleteAnswer(index: number) {
    this.answers.update((current) => {
      const newAnswers = [];
      for (let i = 0; i < current.length; i++) {
        if (i !== index) {
          newAnswers.push(current[i]);
        }
      }
      return newAnswers;
    });
    //this.counter -1;
    console.log(this.answers());
    //console.log(this.questionId());
  }
}
