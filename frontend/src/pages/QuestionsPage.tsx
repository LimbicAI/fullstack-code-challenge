import React, { useState } from "react";
import QuestionList from "../components/Question/QuestionList";
import QuestionForm from "../components/Question/QuestionForm";
import { sessionUserId } from "../config";
import { Question } from "../types";

const QuestionsPage: React.FC = () => {
  const [question, setQuestion] = useState<Question | undefined>(undefined);
  return (
    <div>
      <QuestionForm
        cancelUpdate={() => {
          setQuestion(undefined);
        }}
        existingQuestion={question}
        sessionUserId={sessionUserId}
        onSave={() => {
          setQuestion(undefined);
        }}
      />
      <QuestionList handleEdit={(question) => setQuestion(question)} />
    </div>
  );
};

export default QuestionsPage;
