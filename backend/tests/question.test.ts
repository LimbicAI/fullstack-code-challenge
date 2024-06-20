import request from "supertest";
import app from "../src/app";
import {
  clearTestData,
  closeTestServer,
  seedTestData,
  startTestServer,
} from "./configureTests";

describe("Question API", () => {
  afterAll(async () => {
    closeTestServer();
    await clearTestData();
  });
  beforeAll(() => {
    startTestServer(app);
  });

  it("get all questions", async () => {
    await seedTestData();
    const response = await request(app).get("/questions");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it("should create a question", async () => {
    await seedTestData();
    const response = await request(app).post("/questions").send({
      title: "Created Question",
      content: "Question Content",
      userId: 1,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("title", "Created Question");
  });

  it("should fail to create a question without title", async () => {
    await seedTestData();
    const response = await request(app)
      .post("/questions")
      .send({ content: "Question Content", userId: 1 });
    expect(response.status).toBe(400);
  });

  it("should update a question", async () => {
    await seedTestData();
    const response = await request(app)
      .put("/questions/3")
      .send({ title: "Updated Title", content: "Updated Content" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Updated Title");
  });

  it("should delete a question", async () => {
    await seedTestData();
    const response = await request(app).delete("/questions/3");
    expect(response.status).toBe(204);
  });
});
