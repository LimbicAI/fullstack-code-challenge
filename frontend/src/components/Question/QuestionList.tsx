import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import QuestionItem from "./QuestionItem";
import { RootStoreContext } from "../../stores/RootStoreContext";
import { Question } from "../../types";

type QuestionListProps = {
  handleEdit: (question: Question) => void;
};

const QuestionList: React.FC<QuestionListProps> = observer(({ handleEdit }) => {
  const { questionStore } = useContext(RootStoreContext);

  useEffect(() => {
    questionStore.fetchQuestions();
  }, [questionStore]);

  return (
    <ul className="question-list">
      {questionStore.questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          handleEdit={handleEdit}
        />
      ))}
    </ul>
  );
});

export default QuestionList;
