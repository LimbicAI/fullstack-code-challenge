import axios from "../axiosConfig";
import { Question } from "../types";

export const getAllQuestions = async (): Promise<Question[] | null> => {
  try {
    const res = await axios.get(`/question`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createQuestion = async (
  questionTitle: string
): Promise<Question | null> => {
  try {
    const res = await axios.post(`/question`, {
      title: questionTitle,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateQuestion = async (
  id: string,
  questionTitle: string
): Promise<Question | null> => {
  try {
    const res = await axios.put(`/question/${id}`, {
      title: questionTitle,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteQuestion = async (id: string): Promise<Boolean> => {
  try {
    const res = await axios.delete(`/question/${id}`);
    return res.status === 204;
  } catch (error) {
    console.log(error);
    return false;
  }
};
