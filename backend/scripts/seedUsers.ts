import { Answer } from "../src/models/answerModel";
import { Question } from "../src/models/questionModel";
import sequelize from "./../src/database/database";
import { User } from "./../src/models/userModel";

async function seedUsers() {
  try {
    await sequelize.sync({ force: true });
    const users = [
      { name: "Alice" },
      { name: "Bob" },
      { name: "Charlie" },
      { name: "David" },
      { name: "Eve" },
    ];
    await User.bulkCreate(users);

    const questions = [
      {
        title: "Hi Jane how are you doing?",
        content: "Just wanted to have a quick chat about....",
        userId: 1,
      },
      {
        title: "Hi Bob how are you doing?",
        content: "Hello Bob, just wanted to have a quick chat about....",
        userId: 2,
      },
    ];
    await Question.bulkCreate(questions);

    const answers = [
      {
        content: "Very well thanks....",
        userId: 1,
        questionId: 1,
      },
      {
        content: "I am fine....",
        userId: 2,
        questionId: 1,
      },
    ];
    await Answer.bulkCreate(answers);

    console.log("Mock users have been successfully inserted.");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await sequelize.close();
  }
}
seedUsers();
