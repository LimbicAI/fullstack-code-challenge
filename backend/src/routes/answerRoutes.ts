import { Router } from "express";
import {
  createAnswer,
  deleteAnswer,
  updateAnswer,
} from "../controllers/answerController";
import {
  createAnswerValidator,
  validateUpdateAnswer,
} from "../validators/answerValidator";

const router = Router();
router.post("/", createAnswerValidator, createAnswer);
router.put("/:id", validateUpdateAnswer, updateAnswer);
router.delete("/:id", deleteAnswer);
export default router;
