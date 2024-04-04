import { Question } from "./QuestionTypes";

export type Answer = {
  uuid: string;
  content: string;
  userId: string;
  questionId: string;
  createdAt: Date;
  updatedAt: Date;
  question: Question;
};
