import { Component, output, input, signal, inject, computed } from '@angular/core';
import { QuestionInterface } from '../../../interfaces/survey';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../services/form_service';

@Component({
  selector: 'app-question-form',
  imports: [ReactiveFormsModule],
  templateUrl: './question-form.html',
  styleUrl: './question-form.scss',
})
export class QuestionForm {
  answerForm = inject(FormService);

  controlAnswer = Array.from({ length: 6 }, () => this.answerForm.checkAnswer());

  AnswerId: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  visible: boolean = true;

  // interface wird erwartet. Signals
  question = input.required<QuestionInterface>();

  //answerControls = computed(() => {
  //  return this.question().answers.map(() => {
  //    return this.answerForm.checkAnswer();
  //  });
  //});

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

  // Test funktionen
  answerID(id: number) {
    console.log('Antwort ID: ', id);
  }
}
