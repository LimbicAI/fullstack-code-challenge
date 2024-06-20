import { Express } from "express";
import { Server } from "http";
import { QueryInterface } from "sequelize";
import sequelize from "../src/database/database";
import { Question } from "../src/models/questionModel";
import { User } from "../src/models/userModel";
let server: Server;
export async function startTestServer(app: Express) {
  server = app.listen(3000, () => {});
}
export async function closeTestServer() {
  server.close();
}

async function dropAllTables() {
  const queryInterface: QueryInterface = sequelize.getQueryInterface();
  await queryInterface.dropTable("Answers");
  await queryInterface.dropTable("Questions");
  await queryInterface.dropTable("Users");
}
export async function clearTestData() {
  await dropAllTables();
  sequelize.close();
}
export async function seedTestData() {
  await dropAllTables();
  await sequelize.sync({ force: true });
  await User.create({
    id: 1,
    name: "Mat Damon",
  });
  await User.create({
    id: 2,
    name: "Michael Jordan",
  });
  await Question.create({
    id: 3,
    title: "Hi Jane how are you doing?",
    content: "Just wanted to have a quick chat about....",
    userId: 1,
  });
}
