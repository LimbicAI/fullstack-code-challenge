import { desc, eq, getTableColumns } from 'drizzle-orm';
import { DEFAULT_LIMIT } from '../constants';
import db from '../db';
import { answers } from '../db/schemas/answers';
import { questions } from '../db/schemas/questions';
import { users } from '../db/schemas/users';
import { NonNullableObject, PaginationParams } from '../common/types';
import { alias } from 'drizzle-orm/pg-core';

export const listUsers = async ({ limit, offset }: PaginationParams) => {
  const usersList = await db
    .select()
    .from(users)
    .offset(offset || 0)
    .limit(limit || DEFAULT_LIMIT);

  return usersList;
};

export const listUserAnswers = async ({
  userId,
  limit,
  offset,
}: { userId: number } & PaginationParams) => {
  const userAnswers = await db.query.answers.findMany({
    columns: {
      id: true,
      answer: true,
      createdAt: true,
      updatedAt: true,
    },
    where: () => eq(answers.creatorId, userId),
    with: {
      author: true,
      question: {
        with: {
          author: true,
        },
        columns: {
          id: true,
          title: true,
          description: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    offset: offset || 0,
    limit: limit || DEFAULT_LIMIT,
    orderBy: [desc(answers.id)],
  });

  return userAnswers as NonNullableObject<typeof userAnswers>;
};

export const listUserQuestions = async ({
  userId,
  limit,
  offset,
}: { userId: number } & PaginationParams) => {
  const { authorId: _authorId, ...columns } = await getTableColumns(questions);
  const authors = alias(users, 'author');

  const userQuestions = await db
    .select({
      ...columns,
      author: getTableColumns(authors),
    })
    .from(questions)
    .where(eq(questions.authorId, userId))
    .rightJoin(authors, eq(questions.authorId, authors.id))
    .orderBy(desc(questions.createdAt))
    .offset(offset || 0)
    .limit(limit || DEFAULT_LIMIT);

  return userQuestions as NonNullableObject<typeof userQuestions>;
};
