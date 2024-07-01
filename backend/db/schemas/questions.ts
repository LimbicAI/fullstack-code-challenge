import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { answers } from './answers';
import { users } from './users';
import { boolean } from 'drizzle-orm/pg-core';

export const questions = pgTable('questions', {
  id: serial('id').unique().primaryKey().notNull(),
  title: varchar('title', { length: 123 }).notNull(),
  description: varchar('description', { length: 512 }).notNull(),
  authorId: integer('author_id').notNull(),
  deleted: boolean('deleted').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const questionsRelations = relations(questions, ({ many, one }) => ({
  author: one(users, {
    fields: [questions.authorId],
    references: [users.id],
  }),
  answers: many(answers),
}));

export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;
