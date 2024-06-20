import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Question } from "../../types";
import { RootStoreContext } from "../../stores/RootStoreContext";
import { useNavigate } from "react-router-dom";

type QuestionItemProps = {
  question: Question;
  handleEdit: (question: Question) => void;
};

const QuestionItem: React.FC<QuestionItemProps> = observer(
  ({ question, handleEdit }) => {
    const { questionStore } = useContext(RootStoreContext);

    const handleDelete = () => {
      questionStore.deleteQuestion(question.id);
    };

    const navigate = useNavigate();

    return (
      <li className="question-item">
        <h3>{question.title}</h3>
        <p>{question.content}</p>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => handleEdit(question)}>Edit</button>
        <button onClick={() => navigate(`/questions/${question.id}/answer`)}>
          Answer
        </button>
      </li>
    );
  }
);

export default QuestionItem;
