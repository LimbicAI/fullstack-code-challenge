import express from 'express';
import { createQuestion, editQuestion, deleteQuestion, getAllQuestions } from '../controllers/questionController';

const router = express.Router();

router.post('/', createQuestion);
router.put('/:id', editQuestion);
router.delete('/:id', deleteQuestion);
router.get('/', getAllQuestions);

export default router;
