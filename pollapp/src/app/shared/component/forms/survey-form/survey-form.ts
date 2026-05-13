import { Component, signal } from '@angular/core';
import { QuestionForm } from '../question-form/question-form';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnswerInterface, QuestionInterface } from '../../../interfaces/survey';

@Component({
  selector: 'app-survey-form',
  imports: [ReactiveFormsModule, QuestionForm],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.scss',
})
export class SurveyForm {
  questionCount: number = 0;
  questions = signal<QuestionInterface[]>([]);
  isHoverd: boolean = false;
  //questionCataloge: QuestionInterface[][] = [];

  ngOnInit() {
    //this.questions.set([]);
    this.addNextQuestion();
  }

  toggleCategory() {
    console.log('connect');
    console.log(this.questions());
  }

  addNextQuestion() {
    this.questionCount++;
    const newQuestion: QuestionInterface = {
      id: this.questionCount,
      questionText: '',
      allowMultipleAnswers: false,
      answers: [
        { id: 'id-0', text: '' },
        { id: 'id-1', text: '' },
      ],
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

  //addAnswerInSingleQuestion(id: number) {
  //  console.log(id);
  //  console.log(this.questions());
  //  this.questions.update((current) => {
  //    current.map((targetQuestion) => {
  //      if (targetQuestion.id === id) {
  //        console.log('check: ', targetQuestion);
  //        const newAnswer = { id: 'id-' + targetQuestion.answers.length, text: '' };
  //        return {
  //          id: targetQuestion.id,
  //          questionText: targetQuestion.questionText,
  //          allowMultipleAnswers: targetQuestion.allowMultipleAnsers,
  //          answers: targetQuestion.answers.concat(newAnswer),
  //        };
  //      }
  //    });
  //    return targetQuestion;
  //  });
  //}

  createNewAnswerObject(currentAnswers: number) {
    const id = 'id-' + currentAnswers;
    const newAnser: AnswerInterface = {
      id: id,
      text: '',
    };
    return newAnser;
  }

  checkQuestions(question: QuestionInterface, targetQuestionId: number) {
    const newAnswer = this.createNewAnswerObject(question.answers.length);
    const updateQuestion: QuestionInterface = {
      id: question.id,
      questionText: question.questionText,
      allowMultipleAnswers: question.allowMultipleAnswers,
      answers: question.answers.concat(newAnswer),
    };
    return updateQuestion;
  }

  addAnswerToQuestion(id: number) {
    const self = this;
    this.questions.update(function (currentQuestion) {
      return currentQuestion.map(function (q) {
        return self.checkQuestions(q, id);
      });
    });
  }

  deleteAnswerInSingleQuestion(event: {}) {
    console.log(event);
  }

  //outsourcing in service
  surveyForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required, Validators.minLength(4)] }),
    endDate: new FormControl('', { validators: [Validators.required] }),
  });
}
