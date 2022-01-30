const mockQuestion = {
  id: 1,
  question: "test",
};

import fs from "fs/promises";
import path from "path";
import request from "supertest";
import app from "../index";

jest.mock("fs/promises");
jest.mock("../db/questions.json", () => [mockQuestion]);

const questionsPath = path.resolve(__dirname, "../db/questions.json");

describe("Questions", () => {
  test("GET /questions", async () => {
    return request(app)
      .get("/questions")
      .then((response) => {
        expect(response.body).toEqual([mockQuestion]);
      });
  });

  test("GET /questions/:id", async () => {
    return request(app)
      .get("/questions/1")
      .then((response) => {
        expect(response.body).toEqual(mockQuestion);
      });
  });

  test("POST /questions", async () => {
    const newQuestion = { question: "hello" };

    return request(app)
      .post("/questions")
      .send(newQuestion)
      .then((response) => {
        expect(fs.writeFile).toHaveBeenLastCalledWith(
          questionsPath,
          JSON.stringify([mockQuestion, { id: 2, ...newQuestion }], null, 1)
        );
        expect(response.body).toEqual({ success: true, id: 2, ...newQuestion });
      });
  });

  test("POST /questions/:id", async () => {
    const newQuestion = { question: "hello world" };

    return request(app)
      .post("/questions/2")
      .send(newQuestion)
      .then((response) => {
        expect(fs.writeFile).toHaveBeenLastCalledWith(
          questionsPath,
          JSON.stringify([mockQuestion, { id: 2, ...newQuestion }], null, 1)
        );
        expect(response.body).toEqual({ success: true, id: 2, ...newQuestion });
      });
  });

  test("DELETE /questions/:id", async () => {
    return request(app)
      .delete("/questions/2")
      .then((response) => {
        expect(fs.writeFile).toHaveBeenLastCalledWith(
          questionsPath,
          JSON.stringify([mockQuestion], null, 1)
        );
        expect(response.body).toEqual({ success: true });
      });
  });
});
