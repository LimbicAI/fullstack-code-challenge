import React from "react";
import { useParams } from "react-router-dom";
import AnswerForm from "../components/Answer/AnswerForm";
import { sessionUserId } from "../config";

const AnswerPage: React.FC = () => {
  const { questionId } = useParams<{
    questionId: string;
  }>();

  return (
    <div>
      {questionId && (
        <AnswerForm
          questionId={parseInt(questionId)}
          sessionUserId={sessionUserId}
          onSave={() => {}}
        />
      )}
    </div>
  );
};

export default AnswerPage;
