import axios from "../axiosConfig";
import { Answer } from "../types";

export const getAllUserAnswers = async (): Promise<Answer[] | null> => {
  try {
    const res = await axios.get(`/answer`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createAnswer = async (
  questionTitle: string,
  questionId: string
): Promise<Answer | null> => {
  try {
    const res = await axios.post(`/answer`, {
      content: questionTitle,
      questionId: questionId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateAnswer = async (
  id: string,
  answerContent: string
): Promise<Answer | null> => {
  try {
    const res = await axios.put(`/answer/${id}`, {
      content: answerContent,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
