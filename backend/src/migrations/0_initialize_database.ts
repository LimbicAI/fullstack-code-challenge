import { Knex } from 'knex';
const dbConfig = require('../../knexfile.ts');

const userTable = dbConfig.prefix + dbConfig.tables.user;
const questionTable = dbConfig.prefix + dbConfig.tables.question;
const answerTable = dbConfig.prefix + dbConfig.tables.answer;

export async function up(db: Knex): Promise<void> {
    // Create tables if the migration is run for the first time, otherwise do nothing

    const hasUserTable = await db.schema.hasTable(userTable);
    if(!hasUserTable){
        await db.schema.createTable(userTable, (table) => {
            table.increments('id').primary();
            table.string('fullname').notNullable();
            table.timestamps(true, true);
        });
    }

    const hasQuestionTable = await db.schema.hasTable(questionTable);
    if(!hasQuestionTable){
        await db.schema.createTable(questionTable, (table) => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.string('content').notNullable();
            table.timestamps(true, true);
        });
    }

    const hasAnswerTable = await db.schema.hasTable(answerTable);
    if(!hasAnswerTable){
        await db.schema.createTable(answerTable, (table) => {
            table.increments('id').primary();
            table.integer('userId').unsigned().references('id').inTable(userTable).onDelete('CASCADE');
            table.integer('questionId').unsigned().references('id').inTable(questionTable).onDelete('CASCADE');
            table.string('content').notNullable();
            table.timestamps(true, true);

            table.unique(['userId', 'questionId']);
        });
    }
}

export async function down(db: Knex): Promise<void> {
  // Drop tables if the migration is rolled back

  await db.schema.dropTableIfExists(dbConfig.prefix + dbConfig.tables.answer);
  await db.schema.dropTableIfExists(dbConfig.prefix + dbConfig.tables.question);
  await db.schema.dropTableIfExists(dbConfig.prefix + dbConfig.tables.user);
}
