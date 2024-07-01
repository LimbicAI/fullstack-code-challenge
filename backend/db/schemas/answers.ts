import { integer, pgTable, serial, timestamp, index, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { questions } from './questions';
import { users } from './users';
import { boolean } from 'drizzle-orm/pg-core';

export const answers = pgTable(
  'answers',
  {
    id: serial('id').unique().primaryKey(),
    answer: varchar('name', { length: 512 }).notNull(),
    questionId: integer('question_id').notNull(),
    creatorId: integer('creator_id').notNull(),
    deleted: boolean('deleted').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => {
    return {
      questionAnswersIndex: index('question_id_answer_id_created_at').on(t.questionId, t.id),
      userAnswersIndex: index('user_id_answer_id_created_at').on(t.creatorId, t.id),
    };
  },
);

export const answerRelation = relations(answers, ({ one }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
  author: one(users, {
    fields: [answers.creatorId],
    references: [users.id],
  }),
}));

export type Answer = typeof answers.$inferSelect;
export type NewAnswer = typeof answers.$inferInsert;
