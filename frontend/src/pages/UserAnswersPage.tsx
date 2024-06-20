import React from "react";
import { useParams } from "react-router-dom";
import AnswerList from "../components/Answer/AnswerList";

const UserAnswersPage: React.FC = () => {
  const { userId } = useParams<{
    userId: string;
  }>();

  return (
    <div>
      <h1>Answers by User {userId}</h1>
      {userId && <AnswerList userId={userId} />}
    </div>
  );
};

export default UserAnswersPage;
