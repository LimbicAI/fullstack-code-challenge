import request from "supertest";
import app from "../src/app";
import { Answer } from "../src/models/answerModel";
import {
  clearTestData,
  closeTestServer,
  seedTestData,
  startTestServer,
} from "./configureTests";
import { Server } from "http";

let server: Server;
describe("Answer API", () => {
  afterAll(async () => {
    closeTestServer();
    await clearTestData();
  });
  beforeAll(() => {
    startTestServer(app);
  });
  it("should create an answer", async () => {
    await seedTestData();
    const response = await request(app)
      .post("/answers")
      .send({ content: "Created Answer", questionId: 3, userId: 1 });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("content", "Created Answer");
  });

  it("should fail to create an answer content required", async () => {
    await seedTestData();
    const response = await request(app)
      .post("/answers")
      .send({ questionId: 3, userId: 1 });
    expect(response.status).toBe(400);
  });

  it("should update an answer", async () => {
    await seedTestData();
    await Answer.create({
      id: 3,
      content: "Old Answer",
      userId: 1,
      questionId: 3,
    });
    const response = await request(app)
      .put("/answers/3")
      .send({ content: "Updated Answer" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("content", "Updated Answer");
  });

  it("should delete an answer", async () => {
    await seedTestData();
    await Answer.create({
      id: 3,
      content: "Old Answer",
      userId: 1,
      questionId: 3,
    });
    const response = await request(app).delete("/answers/3");
    expect(response.status).toBe(204);
  });
});
