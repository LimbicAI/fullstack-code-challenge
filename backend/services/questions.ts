import { and, desc, eq, getTableColumns } from 'drizzle-orm';
import { DEFAULT_LIMIT } from '../constants';
import db from '../db';
import { NonNullableObject, PaginationParams } from '../common/types';
import { users, questions, NewQuestion } from '../db/schemas';
import { alias } from 'drizzle-orm/pg-core';
import { Question } from '../generated-types';

export const listQuestions = async ({ limit, offset }: PaginationParams) => {
  const authors = alias(users, 'author');

  const questionAnswers = await db
    .select({
      ...getTableColumns(questions),
      author: getTableColumns(authors),
    })
    .from(questions)
    .where(eq(questions.deleted, false))
    .rightJoin(authors, eq(questions.authorId, authors.id))
    .orderBy(() => [desc(questions.id)])
    .offset(offset || 0)
    .limit(limit || DEFAULT_LIMIT);

  return questionAnswers as NonNullableObject<typeof questionAnswers>;
};

export const addQuestion = async (newQuestion: Omit<NewQuestion, 'createdAt' | 'updatedAt'>) => {
  const insertedQuestion = await db
    .insert(questions)
    .values({
      ...newQuestion,
    })
    .returning({ id: questions.id });

  const questionToReturn = await db.query.questions.findFirst({
    where: () => eq(questions.id, insertedQuestion[0].id),
    with: {
      author: true,
    },
  });

  return questionToReturn as NonNullable<typeof questionToReturn>;
};

export const editQuestion = async ({
  id,
  title,
  description,
  userId,
}: Pick<Question, 'id' | 'title' | 'description'> & { userId: number }) => {
  const updatedQuestion = await db
    .update(questions)
    .set({
      title,
      description,
      updatedAt: new Date(),
    })
    .where(and(eq(questions.id, id), eq(questions.authorId, userId)))
    .returning({ id: questions.id });

  const questionToReturn = await db.query.questions.findFirst({
    where: () => eq(questions.id, updatedQuestion[0].id),
    with: {
      author: true,
    },
  });
  return questionToReturn as NonNullable<typeof questionToReturn>;
};

export const deleteQuestion = async ({ id, userId }: Pick<Question, 'id'> & { userId: number }) => {
  const updatedQuestion = await db
    .update(questions)
    .set({
      deleted: true,
      updatedAt: new Date(),
    })
    .where(and(eq(questions.id, id), eq(questions.authorId, userId)))
    .returning({ id: questions.id });
  const questionToReturn = await db.query.questions.findFirst({
    where: () => eq(questions.id, updatedQuestion[0].id),
    with: {
      author: true,
    },
  });
  return questionToReturn as NonNullable<typeof questionToReturn>;
};
