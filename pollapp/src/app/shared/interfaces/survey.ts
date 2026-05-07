//Ebene 1
export interface SurveyHeaderInterface {
  name: string;
  date?: Date;
  description: string;
  question: QuestionInterface[];
}
// Ebene 2
export interface QuestionInterface {
  questionText: string;
  allowMultipleAnsers: boolean;
  answers: AnswerInterface[];
}
// Ebene 3
export interface AnswerInterface {
  id: string;
  text: string;
}
