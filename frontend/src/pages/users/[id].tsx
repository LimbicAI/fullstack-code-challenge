import React, { useEffect, useState } from "react";

import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AddIcon from "@mui/icons-material/Add";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import Layout from "../../components/Layout";

import { useUserState } from "../../context/users";
import { useQuestionState } from "../../context/questions";

interface QuestionsPageProps {
  id: string;
}

const QuestionsPage: React.FC<QuestionsPageProps> = ({ id }) => {
  const [state, dispatch] = useUserState();
  const [qState] = useQuestionState();

  const [createMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState<number>();

  const [questionValue, setQuestionValue] = useState<number>();
  const [answerValue, setAnswerValue] = useState<string>();

  const userId = parseInt(id, 10);
  const user = state.users.find((u) => u.id === userId);

  useEffect(() => {
    dispatch({ type: "SET_ACTIVE_USER", payload: { id: userId } });

    return () => dispatch({ type: "REMOVE_ACTIVE_USER" });
  }, []);

  const handleCreateClick = () => {
    setAnswerValue("");
    setQuestionValue(undefined);
    setCreateMode(true);
  };

  const handleCreateCancel = () => setCreateMode(false);

  const handleCreateSubmit = (e: React.FormEvent) => {
    if (!questionValue || !answerValue) return;

    dispatch({
      type: "CREATE_ANSWER",
      payload: {
        answer: answerValue,
        question: questionValue,
        callback: (response) =>
          dispatch({
            type: "CREATE_ANSWER_RESPONSE",
            payload: { ...response },
          }),
      },
    });
    setCreateMode(false);

    e.preventDefault();
  };

  const handleEditClick = (a: UserAnswer) => () => {
    console.log(a);
    setEditMode(a.id);
    setQuestionValue(a.question);
    setAnswerValue(a.answer);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    if (editMode === undefined || !questionValue || !answerValue) return;

    dispatch({
      type: "EDIT_ANSWER",
      payload: {
        id: editMode,
        answer: answerValue,
        question: questionValue,
        callback: (response) =>
          dispatch({ type: "EDIT_ANSWER_RESPONSE", payload: { ...response } }),
      },
    });
    setEditMode(undefined);

    e.preventDefault();
  };

  const handleDeleteClick = (a: UserAnswer) => () => {
    dispatch({
      type: "DELETE_ANSWER",
      payload: {
        id: a.id,
        callback: (response) =>
          dispatch({
            type: "DELETE_ANSWER_RESPONSE",
            payload: { ...response },
          }),
      },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerValue(e.target.value);
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setQuestionValue(parseInt(e.target.value, 10));
  };

  if (!user) {
    return null;
  }

  return (
    <Layout title={user.name}>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        onClick={handleCreateClick}
      >
        <AddIcon />
      </Fab>
      <Dialog open={createMode} onClose={handleCreateCancel}>
        <form onSubmit={handleCreateSubmit}>
          <DialogTitle>New Question</DialogTitle>
          <DialogContent>
            <InputLabel id="question-new-label">Question</InputLabel>
            <Select
              labelId="question-new-label"
              id="question-new"
              value={questionValue?.toString() || ""}
              label="Question"
              onChange={handleSelectChange}
              variant="standard"
              fullWidth
            >
              {qState.questions.map((q) => (
                <MenuItem key={q.id} value={q.id}>
                  {q.question}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogContent>
            <TextField
              autoFocus
              id="answer-new"
              label="Answer"
              fullWidth
              variant="standard"
              value={answerValue}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateCancel}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Stack spacing={2}>
        {user.answers.map((a) => (
          <Card
            key={a.id}
            sx={{
              p: 2,
            }}
          >
            {editMode === a.id ? (
              <form onSubmit={handleEditSubmit}>
                <CardContent>
                  <Select
                    id={`question-${a.id}`}
                    value={questionValue?.toString()}
                    aria-label="Question"
                    onChange={handleSelectChange}
                    variant="standard"
                    fullWidth
                  >
                    {qState.questions.map((q) => (
                      <MenuItem key={q.id} value={q.id}>
                        {q.question}
                      </MenuItem>
                    ))}
                  </Select>
                </CardContent>
                <CardContent>
                  <TextField
                    id={`answer-${a.id}`}
                    hiddenLabel
                    aria-label="Question"
                    variant="standard"
                    value={answerValue}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" type="submit">
                    Save
                  </Button>
                </CardActions>
              </form>
            ) : (
              <>
                <CardContent>
                  <Typography component="p" fontWeight="bold">
                    {
                      qState.questions.find((q) => q.id === a.question)
                        ?.question
                    }
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography component="p">{a.answer}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={handleEditClick(a)}
                    disabled={editMode !== undefined}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={handleDeleteClick(a)}
                    disabled={editMode !== undefined}
                  >
                    Delete
                  </Button>
                </CardActions>
              </>
            )}
          </Card>
        ))}
      </Stack>
    </Layout>
  );
};

export default QuestionsPage;
