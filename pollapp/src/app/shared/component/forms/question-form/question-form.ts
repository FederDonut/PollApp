import { Component, output, input, signal, inject } from '@angular/core';
import { QuestionInterface } from '../../../interfaces/survey';

@Component({
  selector: 'app-question-form',
  imports: [],
  templateUrl: './question-form.html',
  styleUrl: './question-form.scss',
})
export class QuestionForm {
  AnswerId: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  visible: boolean = true;

  // interface wird erwartet.
  question = input.required<QuestionInterface>();

  deleteQuestion = output<number>();
  deleteAnswer = output<{ questionID: number; answerID: number }>();
  addAnswer = output<number>();

  hideButton() {
    if (this.question().answers.length >= 6) {
      this.visible = true;
      return 'none';
    } else {
      this.visible = false;
      return '';
    }
  }
  onAddAnswer() {
    this.addAnswer.emit(this.question().id);
    this.hideButton();
  }

  onDeleteAnswer(index: number) {
    this.deleteAnswer.emit({
      questionID: this.question().id,
      answerID: index,
    });
    this.hideButton();
  }

  onDeleteQuestion() {
    this.deleteQuestion.emit(this.question().id);
  }
}
