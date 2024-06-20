import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Answer } from "../../types";
import { RootStoreContext } from "../../stores/RootStoreContext";

type AnswerItemProps = {
  answer: Answer;
};

const AnswerItem: React.FC<AnswerItemProps> = observer(({ answer }) => {
  const { answerStore } = useContext(RootStoreContext);

  const handleDelete = () => {
    answerStore.deleteAnswer(answer.id);
  };

  return (
    <li className="answer-item">
      <h3>{answer.content}</h3>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
});

export default AnswerItem;
