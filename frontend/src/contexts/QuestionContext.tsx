import React, { createContext, useState, useContext, useEffect } from "react";
import { Question } from "../types";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  updateQuestion,
} from "../apiCalls";
import { useAuth } from "./AuthContext";

type QuestionContextProps = {
  questions: Question[];
  selectedQuestion: Question | null;
  setSelectedQuestion: (question: Question) => void;
  addQuestion: (question: string) => Promise<void>;
  editQuestion: (id: string, newText: string) => void;
  removeQuestion: (id: string) => void;
};

const QuestionContext = createContext<QuestionContextProps>({
  questions: [],
  selectedQuestion: null,
  setSelectedQuestion: () => {},
  addQuestion: async () => {},
  editQuestion: () => {},
  removeQuestion: () => {},
});

export const QuestionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const questions = await getAllQuestions();
      const dockerQuestions = questions?.filter(
        (question) => question.userId === user?.uuid
      );
      setQuestions(
        (user?.role === "client" ? dockerQuestions : questions) || []
      );
    };

    fetchData();
    return () => {
      setQuestions([]);
    };
  }, []);

  const addQuestion = async (question: string) => {
    const newQuestion = await createQuestion(question);
    if (newQuestion) {
      setQuestions([...questions, newQuestion]);
    }
  };

  const editQuestion = async (id: string, newText: string) => {
    const updatedQuestion = await updateQuestion(id, newText);

    if (updatedQuestion) {
      setQuestions((prev) =>
        prev.map((question) =>
          question.uuid === id ? { ...question, title: newText } : question
        )
      );
    }
  };

  const removeQuestion = async (id: string) => {
    const isDeleted = await deleteQuestion(id);
    if (isDeleted)
      setQuestions(questions.filter((question) => question.uuid !== id));
  };

  return (
    <QuestionContext.Provider
      value={{
        questions,
        addQuestion,
        editQuestion,
        removeQuestion,
        setSelectedQuestion,
        selectedQuestion,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestion = () => useContext(QuestionContext);
