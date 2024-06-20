import React, { useContext, useEffect, useState } from "react";
import { Question } from "../../types";
import { RootStoreContext } from "../../stores/RootStoreContext";
import { Alert, TextField } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";

type QuestionFormProps = {
  existingQuestion?: Question;
  onSave: () => void;
  cancelUpdate: () => void;
  sessionUserId: number;
};

const QuestionForm: React.FC<QuestionFormProps> = ({
  existingQuestion,
  onSave,
  cancelUpdate,
  sessionUserId,
}) => {
  const { questionStore } = useContext(RootStoreContext);
  const [title, setTitle] = useState(existingQuestion?.title || "");
  const [content, setContent] = useState(existingQuestion?.content || "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setTitle(existingQuestion?.title || "");
    setContent(existingQuestion?.content || "");
    setSaved(false);
  }, [existingQuestion]);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (existingQuestion) {
      await questionStore.editQuestion(existingQuestion.id, title, content);
    } else {
      await questionStore.addQuestion(title, content, sessionUserId);
    }
    setTitle("");
    setContent("");
    setSaved(true);
    onSave();
  };

  return (
    <div className="question-form-wrap">
      <div className="question-form">
        <form onSubmit={handleSubmit}>
          <div className="question-form-title">
            <TextField
              placeholder="Title"
              value={title}
              style={{ width: "100%" }}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
            />
          </div>
          <div className="question-form-description">
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
              Question sent!
            </Alert>
          )}
          <button
            disabled={!content || !title}
            className="question-form-button"
            style={{
              backgroundColor: !content || !title ? "#BDBDBD" : "#EF76DF",
            }}
            type="submit"
          >
            {existingQuestion ? "Update" : "Add"} Question
          </button>
        </form>
        {existingQuestion && (
          <button
            className="question-form-button"
            style={{
              backgroundColor: "#444",
            }}
            onClick={() => cancelUpdate()}
          >
            Cancel Update
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionForm;
