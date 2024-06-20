import { makeAutoObservable } from "mobx";
import apiClient from "../api/apiClient";
import { Answer } from "../types";

class AnswerStore {
  answers: Answer[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAnswersByUser(userId: string) {
    const response = await apiClient.get(`/users/${userId}/answers`);
    this.answers = response.data;
  }

  async addAnswer(userId: number, questionId: number, content: string) {
    const response = await apiClient.post(`/answers`, {
      userId,
      questionId,
      content,
    });
    this.answers.push(response.data);
  }

  async deleteAnswer(id: number) {
    await apiClient.delete(`/answers/${id}`);
    this.answers = this.answers.filter((answer) => answer.id !== id);
  }
}

export default AnswerStore;
