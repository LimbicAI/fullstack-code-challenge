import { body, param } from "express-validator";
import { validate } from "../middlewares/validate";

export const createQuestionValidator = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required"),
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
];

export const validateUpdateQuestion = [
  param("id").isInt().withMessage("ID must be an integer"),
  body("title").optional().isString().withMessage("Title must be a string"),
  body("content").optional().isString().withMessage("Content must be a string"),
  validate,
];
