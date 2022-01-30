import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import * as users from "./routes/users";
import * as questions from "./routes/questions";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get("/users", users.list);
app.get("/users/:id", users.read);

app.get("/users/:userId/answers", users.listAnswers);
app.post("/users/:userId/answers", users.createAnswer);
app.get("/users/:userId/answers/:id", users.readAnswer);
app.post("/users/:userId/answers/:id", users.updateAnswer);
app.delete("/users/:userId/answers/:id", users.delAnswer);

app.get("/questions", questions.list);
app.post("/questions", questions.create);
app.get("/questions/:id", questions.read);
app.post("/questions/:id", questions.update);
app.delete("/questions/:id", questions.del);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

export default app;
