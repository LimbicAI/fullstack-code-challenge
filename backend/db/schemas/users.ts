import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar, date, timestamp } from 'drizzle-orm/pg-core';
import { questions } from './questions';
import { answers } from './answers';

export const users = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  birthday: date('birthday', { mode: 'string' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  questions: many(questions),
  answers: many(answers),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
