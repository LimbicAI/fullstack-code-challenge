// src/services/api.ts
import axios from 'axios';

const baseURL = 'http://localhost:3001';

const api = axios.create({
  baseURL,
});

export const getUsers = () => api.get('/users');
export const getQuestions = () => api.get('/questions');
export const createQuestion = (data: any) => api.post('/questions', data);
export const editQuestion = (id: string, data: any) => api.put(`/questions/${id}`, data);
export const deleteQuestion = (id: string) => api.delete(`/questions/${id}`);
export const getUserAnswers = (userId: string) => api.get(`/answers/user/${userId}`);
export const createAnswer = (data: any) => api.post('/answers', data);
export const deleteAnswer = (id: string) => api.delete(`/answers/${id}`);

const apiService = {
  getUsers,
  getQuestions,
  createQuestion,
  editQuestion,
  deleteQuestion,
  getUserAnswers,
  createAnswer,
  deleteAnswer,
};

export default apiService;
