import { CheckCircleOutline } from "@mui/icons-material";
import { Alert, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { RootStoreContext } from "../../stores/RootStoreContext";

type AnswerFormProps = {
  onSave: () => void;
  sessionUserId: number;
  questionId: number;
};

const AnswerForm: React.FC<AnswerFormProps> = ({
  onSave,
  sessionUserId,
  questionId,
}) => {
  const { answerStore } = useContext(RootStoreContext);
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await answerStore.addAnswer(sessionUserId, questionId, content);
    setContent("");
    setSaved(true);
    onSave();
  };

  return (
    <div className="answer-form-wrap">
      <div className="answer-form">
        <form onSubmit={handleSubmit}>
          <div className="answer-form-description">
            <TextField
              value={content}
              label="Content"
              multiline
              style={{ width: "100%" }}
              placeholder="Content"
              onChange={(e) => setContent(e.target.value)}
              maxRows={10}
              minRows={4}
            />
          </div>
          {saved && (
            <Alert
              icon={<CheckCircleOutline fontSize="inherit" />}
              severity="success"
            >
              Answer sent!
            </Alert>
          )}
          <button
            disabled={!content}
            className="answer-form-button"
            style={{
              backgroundColor: !content ? "#BDBDBD" : "#EF76DF",
            }}
            type="submit"
          >
            Add Answer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnswerForm;
