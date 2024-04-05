import { Request, Response, NextFunction } from 'express';
import Answer from '../models/answer';

export const createAnswer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body, userId, questionId } = req.body;
    const answer = new Answer({ body, userId, questionId });
    await answer.save();
    res.status(201).json(answer);
  } catch (err) {
    next(err);
  }
};

export const editAnswer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { body } = req.body;
    const answer = await Answer.findByIdAndUpdate(id, { body }, { new: true });
    res.json(answer);
  } catch (err) {
    next(err);
  }
};

export const deleteAnswer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await Answer.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export const getUserAnswers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const answers = await Answer.find({ userId }).populate('questionId', 'title');
    res.json(answers);
  } catch (err) {
    next(err);
  }
};
