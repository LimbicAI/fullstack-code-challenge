import { body, param } from "express-validator";
import { validate } from "../middlewares/validate";

export const createAnswerValidator = [
  body("content")
    .isString()
    .withMessage("Content must be a string")
    .notEmpty()
    .withMessage("Content is required"),
  body("userId")
    .isInt()
    .withMessage("User ID must be an integer")
    .notEmpty()
    .withMessage("User ID is required"),
  body("questionId")
    .isInt()
    .withMessage("Question ID must be an integer")
    .notEmpty()
    .withMessage("Question ID is required"),
];

export const validateUpdateAnswer = [
  param("id").isInt().withMessage("ID must be an integer"),
  body("content").isString().withMessage("Content must be a string"),
  validate,
];
