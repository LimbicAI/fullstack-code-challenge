import { Request, Response, NextFunction } from "express";
import { Question } from "./../models/questionModel";
import { validationResult } from "express-validator";
import { User } from "../models/userModel";

export async function getAllQuestions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const questions = await Question.findAll();
    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
}

export async function createQuestion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findByPk(req.body.userId);
    if (!user) {
      return res.status(400).json({ errors: "Invalid user does not exist" });
    }
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    next(error);
  }
}

export async function updateQuestion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const question = await Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    question.title = title;
    question.content = content;
    await question.save();
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
}

export async function deleteQuestion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    await question.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
