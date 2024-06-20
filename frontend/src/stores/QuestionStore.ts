import { makeAutoObservable } from "mobx";
import apiClient from "../api/apiClient";
import { Question } from "../types";

class QuestionStore {
  questions: Question[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchQuestions() {
    const response = await apiClient.get("/questions");
    this.questions = response.data;
  }

  async addQuestion(title: string, content: string, userId: number) {
    const response = await apiClient.post("/questions", {
      title,
      content,
      userId,
    });
    this.questions.push(response.data);
  }

  async editQuestion(id: number, title: string, content: string) {
    await apiClient.put(`/questions/${id}`, { title, content });
    const question = this.questions.find((question) => question.id === id);
    if (question) {
      question.title = title;
      question.content = content;
    }
  }

  async deleteQuestion(id: number) {
    await apiClient.delete(`/questions/${id}`);
    this.questions = this.questions.filter((question) => question.id !== id);
  }
}

export default QuestionStore;
