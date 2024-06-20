import request from "supertest";
import app from "../src/app";
import { Answer } from "../src/models/answerModel";
import {
  clearTestData,
  closeTestServer,
  seedTestData,
  startTestServer,
} from "./configureTests";

describe("User API", () => {
  afterAll(async () => {
    closeTestServer();
    await clearTestData();
  });
  beforeAll(() => {
    startTestServer(app);
  });

  // Test for getting all users
  it("should get all users", async () => {
    await seedTestData(); // Populate database with initial data
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should return all answers for a user", async () => {
    await seedTestData();
    await Answer.create({
      id: 4,
      content: "User 1 Answer 2",
      userId: 1,
      questionId: 3,
    });
    await Answer.create({
      id: 5,
      content: "User 2 Answer 2",
      userId: 2,
      questionId: 3,
    });
    const response = await request(app).get("/users/1/answers");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it("should return empty array for non-existing user ID", async () => {
    await seedTestData();
    const response = await request(app).get("/users/999/answers");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(0);
  });
});
