import { RequestHandler } from "express";
import fs from "fs/promises";
import path from "path";

import users from "../db/users.json";

const filePath = path.resolve(__dirname, "../db/users.json");

const getUserIndex = (userId: string) =>
  users.findIndex((u) => u.id === parseInt(userId, 10));

export const list: RequestHandler = (req, res) => {
  res.json(users);
};

export const read: RequestHandler = (req, res) => {
  const { id } = req.params;

  const i = getUserIndex(id);

  if (i === -1) {
    res.status(404);
    res.json({ success: false });
  }

  res.json(users[i]);
};

export const listAnswers: RequestHandler = (req, res) => {
  const { userId } = req.params;

  res.json(users.find(({ id }) => id === parseInt(userId, 10))?.answers);
};

export const createAnswer: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const { answer, question } = req.body;

  const userIndex = getUserIndex(userId);

  const newRecord = {
    id: users[userIndex].answers.length + 1,
    answer: answer,
    question: parseInt(question, 10),
  };

  users[userIndex].answers.push(newRecord);

  try {
    await fs.writeFile(filePath, JSON.stringify(users, null, 1));
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ success: false });
  }

  res.json({ success: true, ...newRecord });
};

export const readAnswer: RequestHandler = (req, res) => {
  const { userId, id } = req.params;

  const userIndex = getUserIndex(userId);

  const answer = users[userIndex]?.answers.find(
    (a) => a.id === parseInt(id, 10)
  );

  if (!answer) {
    res.status(404);
    res.json({ success: false });
  }

  res.json(answer);
};

export const updateAnswer: RequestHandler = async (req, res) => {
  const { userId, id } = req.params;

  const { answer, question } = req.body;

  const userIndex = getUserIndex(userId);

  const index = users[userIndex]?.answers.findIndex(
    (q) => q.id === parseInt(id, 10)
  );

  if (!index || index === -1) {
    res.status(404);
    res.json({ success: false });
  }

  users[userIndex].answers[index].answer = answer;
  users[userIndex].answers[index].question = parseInt(question, 10);

  try {
    await fs.writeFile(filePath, JSON.stringify(users, null, 1));
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ success: false });
  }

  res.json({ success: true, ...users[userIndex].answers[index] });
};

export const delAnswer: RequestHandler = async (req, res) => {
  const { userId, id } = req.params;

  const userIndex = getUserIndex(userId);

  const index = users[userIndex]?.answers.findIndex(
    (q) => q.id === parseInt(id, 10)
  );

  if (index === -1) {
    res.status(404);
    res.json({ success: false });
  }

  users[userIndex].answers.splice(index, 1);

  try {
    await fs.writeFile(filePath, JSON.stringify(users, null, 1));
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ success: false });
  }

  res.json({ success: true });
};
