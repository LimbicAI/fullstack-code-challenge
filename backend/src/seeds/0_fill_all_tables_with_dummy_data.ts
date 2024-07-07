import { Knex } from "knex";
import { faker } from '@faker-js/faker';

const dbConfig = require('../../knexfile.ts');

const userTable = dbConfig.prefix + dbConfig.tables.user;
const questionTable = dbConfig.prefix + dbConfig.tables.question;
const answerTable = dbConfig.prefix + dbConfig.tables.answer;

export async function seed(db: Knex): Promise<void> {
    // Deletes All existing entries
    await db(answerTable).del();
    await db(questionTable).del();
    await db(userTable).del();
    
    let users: any = [];
    for(let i = 0; i < 10; i++){ // 10 records randomly generated
        users.push({ fullname: faker.person.fullName() });
    }
    console.log({ users });

    let questions: any = [];
    for(let i = 0; i < 5; i++){ // 5 records randomly generated
        questions.push({ title: faker.lorem.sentence(), content: faker.lorem.paragraph() });
    }
    console.log({ questions });

    // Inserts seed entries
    // Ids are Auto incremented by default
    await db(userTable).insert(users);
    await db(questionTable).insert(questions);
    // Answers will be provided manually
};
