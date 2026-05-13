//Ebene 1
export interface SurveyHeaderInterface {
  name: string;
  date?: Date;
  description: string;
  question: QuestionInterface[];
}
// Ebene 2
export interface QuestionInterface {
  id: number;
  questionText: string;
  allowMultipleAnswers: boolean;
  answers: AnswerInterface[];
}

export interface AnswerInterface {
  id: string;
  text: string;
}
