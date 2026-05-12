import { Component, output, input, signal, inject } from '@angular/core';
import { AnswerInterface } from '../../../interfaces/survey';

@Component({
  selector: 'app-question-form',
  imports: [],
  templateUrl: './question-form.html',
  styleUrl: './question-form.scss',
})
export class QuestionForm {
  AnswerId: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  questionCounter: number = 1;

  questionId = input<number>(1);
  visible: boolean = true;
  counter: number = 2;
  answers = signal<AnswerInterface[]>([
    { question_id: this.questionId(), answer_body: { id: 'id-' + 0, text: '' } }, //test 0
    { question_id: this.questionId(), answer_body: { id: 'id-' + 1, text: '' } }, //test 1
  ]);

  ngOnInit() {
    this.answers.set([
      { question_id: this.questionId(), answer_body: { id: 'id-' + 0, text: '' } },
      { question_id: this.questionId(), answer_body: { id: 'id-' + 1, text: '' } },
    ]);
  }

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
    this.questionCounter++;
    const newAnswers: AnswerInterface = {
      question_id: this.questionId(),
      answer_body: {
        id: 'id-' + this.counter++,
        text: '',
      },
    };

    console.log('Neue Frage: ' + newAnswers.question_id);
    console.log('Input-Element:' + this.questionId());
    this.answers.update((currentAnswer) => [...currentAnswer, newAnswers]);
    console.log('Fragecatalog:', this.answers());
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
    console.log(this.answers());
    console.log(this.questionId());
  }

  deleteWholeQuestion() {
    console.log(this.answers());
  }
}
