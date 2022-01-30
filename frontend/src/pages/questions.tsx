import React, { useState } from "react";

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

import Layout from "../components/Layout";

import { useQuestionState } from "../context/questions";

const QuestionsPage = () => {
  const [createMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState<number>();
  const [questionValue, setQuestionValue] = useState<string>();
  const [state, dispatch] = useQuestionState();

  const handleCreateClick = () => {
    setQuestionValue("");
    setCreateMode(true);
  };

  const handleCreateCancel = () => setCreateMode(false);

  const handleCreateSubmit = (e: React.FormEvent) => {
    if (!questionValue) return;

    dispatch({
      type: "CREATE",
      payload: {
        question: questionValue,
        callback: (response) =>
          dispatch({ type: "CREATE_RESPONSE", payload: { ...response } }),
      },
    });
    setCreateMode(false);

    e.preventDefault();
  };

  const handleEditClick = (q: Question) => () => {
    setEditMode(q.id);
    setQuestionValue(q.question);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    if (editMode === undefined || !questionValue) return;

    dispatch({
      type: "EDIT",
      payload: {
        id: editMode,
        question: questionValue,
        callback: (response) =>
          dispatch({ type: "EDIT_RESPONSE", payload: { ...response } }),
      },
    });
    setEditMode(undefined);

    e.preventDefault();
  };

  const handleDeleteClick = (q: Question) => () => {
    dispatch({
      type: "DELETE",
      payload: {
        id: q.id,
        callback: (response) =>
          dispatch({ type: "DELETE_RESPONSE", payload: { ...response } }),
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionValue(e.target.value);
  };

  return (
    <Layout title="Questions">
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
            <TextField
              autoFocus
              id="question-new"
              label="Question"
              fullWidth
              variant="standard"
              value={questionValue}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateCancel}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Stack spacing={2}>
        {state.questions.map((q) => (
          <Card
            key={q.id}
            sx={{
              p: 2,
            }}
          >
            {editMode === q.id ? (
              <form onSubmit={handleEditSubmit}>
                <CardContent>
                  <TextField
                    id={`question-${q.id}`}
                    hiddenLabel
                    aria-label="Question"
                    variant="standard"
                    value={questionValue}
                    onChange={handleChange}
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
                  <Typography component="p">{q.question}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={handleEditClick(q)}
                    disabled={editMode !== undefined}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={handleDeleteClick(q)}
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
