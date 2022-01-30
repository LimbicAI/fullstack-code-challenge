import { RequestHandler } from "express";
import fs from "fs/promises";
import path from "path";
import questions from "../db/questions.json";

const filePath = path.resolve(__dirname, "../db/questions.json");

export const list: RequestHandler = (req, res) => {
  res.json(questions);
};

export const create: RequestHandler = async (req, res) => {
  const { question } = req.body;

  const id = questions.length + 1;

  questions.push({
    id,
    question,
  });

  try {
    await fs.writeFile(filePath, JSON.stringify(questions, null, 1));
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ success: false });
  }

  res.json({ success: true, id, question });
};

export const read: RequestHandler = (req, res) => {
  const { id } = req.params;

  res.json(questions.find((q) => q.id === parseInt(id, 10)));
};

export const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { question } = req.body;

  const reqId = parseInt(id, 10);

  const index = questions.findIndex((q) => q.id === reqId);

  if (index === -1) {
    res.status(404);
    res.json({ success: false });
  }

  questions[index].question = question;

  try {
    await fs.writeFile(filePath, JSON.stringify(questions, null, 1));
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ success: false });
  }

  res.json({ success: true, ...questions[index] });
};

export const del: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const reqId = parseInt(id, 10);

  const index = questions.findIndex((q) => q.id === reqId);

  if (index === -1) {
    res.status(404);
    res.json({ success: false });
  }

  questions.splice(index, 1);

  try {
    await fs.writeFile(filePath, JSON.stringify(questions, null, 1));
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ success: false });
  }

  res.json({ success: true });
};
