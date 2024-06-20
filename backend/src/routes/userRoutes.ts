import { Router } from "express";
import { getAllUsers } from "../controllers/userController";
import { getAnswersByUserId } from "../controllers/answerController";
const router = Router();
router.get("/", getAllUsers);
router.get("/:userId/answers", getAnswersByUserId);
export default router;
