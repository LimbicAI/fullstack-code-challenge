import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import config from '../config';
import * as schema from '../db/schemas';
import { faker } from '@faker-js/faker';
import { runtimeLogger } from '../utils/loggers';

const client = new Client(
  `postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`,
);

// This will push seed on the database
const runSeed = async () => {
  try {
    await client.connect();
    const db = drizzle(client, { schema });

    const dbIsDirty = await db.query.users.findFirst();

    if (dbIsDirty != null) {
      runtimeLogger.info('SEED ALREADY IN!');
      await client.end();
      return;
    }

    const users: schema.NewUser[] = [];
    for (let i = 0; i < 20; i++) {
      users.push({
        birthday: faker.date.birthdate().toISOString(),
        name: faker.person.fullName(),
      });
    }
    const insertedUsers = await db.insert(schema.users).values(users).returning();

    const questions: schema.NewQuestion[] = [];
    for (let i = 0; i < 20; i++) {
      questions.push({
        title: faker.lorem.words({ min: 1, max: 5 }),
        description: faker.lorem.sentences({ min: 1, max: 5 }),
        authorId: insertedUsers[Math.round(Math.random() * 19)].id,
      });
    }
    const insertedQuestions = await db.insert(schema.questions).values(questions).returning();

    const answers: schema.NewAnswer[] = [];
    for (let i = 0; i < 20; i++) {
      for (let i = 0; i < Math.random() * 20; i++) {
        answers.push({
          questionId: insertedQuestions[Math.round(Math.random() * 19)].id,
          answer: faker.lorem.sentences({ min: 1, max: 5 }),
          creatorId: insertedUsers[Math.round(Math.random() * 19)].id,
        });
      }
    }
    await db.insert(schema.answers).values(answers);

    await client.end();
  } catch (error) {
    console.error('SOMETHING WENT WRONG', error);
  }
};

runSeed();
