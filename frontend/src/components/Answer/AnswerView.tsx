import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../stores/RootStoreContext";
import AnswerItem from "./AnswerItem";

type AnswerViewProps = {
  userId: string;
  answerId: string;
};

const AnswerList: React.FC<AnswerViewProps> = observer(
  ({ userId, answerId }) => {
    const { answerStore } = useContext(RootStoreContext);

    useEffect(() => {
      answerStore.fetchAnswersByUser(userId);
    }, [answerStore, userId]);

    return (
      <ul className="answer-list">
        {answerStore.answers.map((answer) => (
          <AnswerItem key={answer.id} answer={answer} />
        ))}
      </ul>
    );
  }
);

export default AnswerList;
