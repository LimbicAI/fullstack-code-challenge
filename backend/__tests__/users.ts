const mockUser = {
  id: 1,
  name: "test",
  answers: [{ id: 1, question: 1, answer: "test" }],
};

import fs from "fs/promises";
import path from "path";
import request from "supertest";
import app from "../index";

jest.mock("fs/promises");
jest.mock("../db/users.json", () => [mockUser]);

const usersPath = path.resolve(__dirname, "../db/users.json");

describe("Users", () => {
  test("GET /users", async () => {
    return request(app)
      .get("/users")
      .then((response) => {
        expect(response.body).toEqual([mockUser]);
      });
  });

  test("GET /users/:id", async () => {
    return request(app)
      .get("/users/1")
      .then((response) => {
        expect(response.body).toEqual(mockUser);
      });
  });

  test("GET /users/:userId/answers", async () => {
    return request(app)
      .get("/users/1/answers")
      .then((response) => {
        expect(response.body).toEqual(mockUser.answers);
      });
  });

  test("POST /users/:userId/answers", async () => {
    const newAnswer = { answer: "new test", question: 2 };
    const expectedUser = {
      ...mockUser,
      answers: [...mockUser.answers, { id: 2, ...newAnswer }],
    };

    return request(app)
      .post("/users/1/answers")
      .send(newAnswer)
      .then((response) => {
        expect(fs.writeFile).toHaveBeenLastCalledWith(
          usersPath,
          JSON.stringify([expectedUser], null, 1)
        );
        expect(response.body).toEqual({ success: true, id: 2, ...newAnswer });
      });
  });

  test("POST /users/:userId/answers/:id", async () => {
    const newAnswer = { answer: "updated test", question: 2 };
    const expectedUser = {
      ...mockUser,
      answers: [mockUser.answers[0], { id: 2, ...newAnswer }],
    };

    return request(app)
      .post("/users/1/answers/2")
      .send(newAnswer)
      .then((response) => {
        expect(fs.writeFile).toHaveBeenLastCalledWith(
          usersPath,
          JSON.stringify([expectedUser], null, 1)
        );
        expect(response.body).toEqual({ success: true, id: 2, ...newAnswer });
      });
  });

  test("DELETE /users/:userId/answers/:id", async () => {
    const expectedUser = {
      ...mockUser,
      answers: [mockUser.answers[0]],
    };

    return request(app)
      .delete("/users/1/answers/2")
      .then((response) => {
        expect(fs.writeFile).toHaveBeenLastCalledWith(
          usersPath,
          JSON.stringify([expectedUser], null, 1)
        );
        expect(response.body).toEqual({ success: true });
      });
  });
});
