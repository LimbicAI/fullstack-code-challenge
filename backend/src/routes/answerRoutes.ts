import express from 'express';
import { createAnswer, editAnswer, deleteAnswer, getUserAnswers } from '../controllers/answerController';

const router = express.Router();

router.post('/', createAnswer);
router.put('/:id', editAnswer);
router.delete('/:id', deleteAnswer);
router.get('/user/:userId', getUserAnswers);

export default router;
