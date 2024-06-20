import { Router } from "express";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  updateQuestion,
} from "../controllers/questionController";
import {
  createQuestionValidator,
  validateUpdateQuestion,
} from "../validators/questionValidator";

const router = Router();
router.get("/", getAllQuestions);
router.post("/", createQuestionValidator, createQuestion);
router.put("/:id", validateUpdateQuestion, updateQuestion);
router.delete("/:id", deleteQuestion);

export default router;
