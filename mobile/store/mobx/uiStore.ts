import { Answer, Question } from "@/gql/__generated__/graphql";
import { makeAutoObservable } from "mobx";

class UIStore {
  selectedQuestion: Question | null = null;
  selectedAnswer: Answer | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedQuestion(question: Question | null) {
    this.selectedQuestion = question;
  }
  setSelectedAnswer(answer: Answer | null) {
    this.selectedAnswer = answer;
  }
}

export default new UIStore();
