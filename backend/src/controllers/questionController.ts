import { Request, Response, NextFunction } from 'express';
import Question from '../models/question';

export const createQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, body, userId } = req.body;
    const question = new Question({ title, body, userId });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    next(err);
  }
};

export const editQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    const question = await Question.findByIdAndUpdate(id, { title, body }, { new: true });
    res.json(question);
  } catch (err) {
    next(err);
  }
};

export const deleteQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export const getAllQuestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    next(err);
  }
};
