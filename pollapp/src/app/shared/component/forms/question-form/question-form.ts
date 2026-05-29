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
  formService = inject(FormService);

  controlAnswer: FormControl[] = [];
  controlQuestion = this.formService.checkQuestion();

  //controlQuestion = this.answerForm.surveyForm;

  AnswerId: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  visible: boolean = true;

  // interface wird erwartet. Signals
  question = input.required<QuestionInterface>();
  index = input.required<number>();

  deleteQuestion = output<number>();
  deleteAnswer = output<{ questionID: number; answerID: number }>();
  addAnswer = output<number>();

  ngOnInit() {
    this.controlAnswer = Array.from({ length: this.question().answers.length }, () => {
      return this.formService.checkAnswer();
    });
  }

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
    this.controlAnswer.push(this.formService.checkAnswer());
    this.hideButton();
  }

  onDeleteAnswer(index: number) {
    this.controlAnswer.splice(index, 1);
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
