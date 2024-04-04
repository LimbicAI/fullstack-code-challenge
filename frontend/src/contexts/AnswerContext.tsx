import React, { createContext, useState, useContext, useEffect } from "react";

import { useAuth } from "./AuthContext";
import { Answer } from "../types";
import {
  createAnswer,
  getAllUserAnswers,
  updateAnswer,
} from "../apiCalls/answer";

type AnswerContextProps = {
  answers: Answer[];
  selectedAnswer: Answer | null;
  setSelectedAnswer: (question: Answer | null) => void;
  addAnswer: (question: string, questionId: string) => Promise<void>;
  editAnswer: (id: string, newText: string) => void;
  removeAnswer: (id: string) => void;
  getAnswer: (questionId: string) => Answer | null;
};

const AnswerContext = createContext<AnswerContextProps>({
  answers: [],
  selectedAnswer: null,
  setSelectedAnswer: () => {},
  addAnswer: async () => {},
  editAnswer: () => {},
  removeAnswer: () => {},
  getAnswer: () => null,
});

export const AnswerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const answers = await getAllUserAnswers();
      const userAnswers = answers?.filter((a) => a.userId === user?.uuid);

      setAnswers(userAnswers || []);
    };

    fetchData();
    return () => {
      setAnswers([]);
    };
  }, []);

  const addAnswer = async (answer: string, questionId: string) => {
    const newAnswer = await createAnswer(answer, questionId);
    if (newAnswer) {
      setAnswers([...answers, newAnswer]);
    }
  };

  const getAnswer = (questionId: string) => {
    return (
      answers.find(
        (answer) =>
          answer.questionId === questionId && answer.userId === user?.uuid
      ) || null
    );
  };

  const editAnswer = async (id: string, newText: string) => {
    const updatedAnswer = await updateAnswer(id, newText);
    if (updatedAnswer) {
      setAnswers((prev) =>
        prev.map((question) =>
          question.uuid === id ? { ...question, content: newText } : question
        )
      );
    }
  };

  const removeAnswer = async () => {
    // const isDeleted = await deleteAnswer(id);
    // if (isDeleted)
    //   setAnswers(questions.filter((question) => question.uuid !== id));
  };

  return (
    <AnswerContext.Provider
      value={{
        answers,
        addAnswer,
        editAnswer,
        removeAnswer,
        setSelectedAnswer,
        selectedAnswer,
        getAnswer,
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
};

export const useAnswer = () => useContext(AnswerContext);
