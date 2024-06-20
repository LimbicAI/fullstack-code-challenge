import { Request, Response, NextFunction } from "express";
import { Answer } from "./../models/answerModel";
import { validationResult } from "express-validator";
import { User } from "../models/userModel";

export async function createAnswer(
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
    const answer = await Answer.create(req.body);
    res.status(201).json(answer);
  } catch (error) {
    next(error);
  }
}

export async function updateAnswer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const answer = await Answer.findByPk(id);
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }
    answer.content = content;
    await answer.save();
    res.status(200).json(answer);
  } catch (error) {
    next(error);
  }
}

export async function deleteAnswer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const answer = await Answer.findByPk(id);
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }
    await answer.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function getAnswersByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params;
    const answers = await Answer.findAll({ where: { userId } });
    if (!answers) {
      return res.status(404).json({ error: "No answers found for this user" });
    }
    res.status(200).json(answers);
  } catch (error) {
    next(error);
  }
}
