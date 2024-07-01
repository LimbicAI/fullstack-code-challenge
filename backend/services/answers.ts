import { and, desc, eq } from 'drizzle-orm';
import { DEFAULT_LIMIT } from '../constants';
import db from '../db';
import { NonNullableObject, PaginationParams } from '../common/types';
import { answers, questions, NewAnswer, Answer } from '../db/schemas';

export const listQuestionAnswers = async ({
  id,
  limit,
  offset,
}: { id: number } & PaginationParams) => {
  const questionAnswers = await db.query.answers.findMany({
    columns: {
      id: true,
      answer: true,
      createdAt: true,
      updatedAt: true,
    },
    where: () =>
      and(eq(answers.questionId, id), eq(answers.deleted, false), eq(questions.deleted, false)),
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
    orderBy: [desc(answers.createdAt)],
  });

  return questionAnswers as NonNullableObject<typeof questionAnswers>;
};

export const addAnswer = async (newUser: Omit<NewAnswer, 'createdAt' | 'updatedAt'>) => {
  const answerToReturn = await db.transaction(async (tx) => {
    const newAnswer = await tx
      .insert(answers)
      .values({
        ...newUser,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning({ id: answers.id });

    return tx.query.answers.findFirst({
      where: () => eq(answers.id, newAnswer[0].id),
      with: {
        author: true,
        question: {
          with: {
            author: true,
          },
          columns: {
            deleted: false,
          },
        },
      },
      columns: { deleted: false },
    });
  });

  return answerToReturn as NonNullable<typeof answerToReturn>;
};

export const editAnswer = async ({
  id,
  answer,
  userId,
}: Pick<Answer, 'id' | 'answer'> & { userId: number }) => {
  const updatedAnswer = await db
    .update(answers)
    .set({
      answer,
      updatedAt: new Date(),
    })
    .where(and(eq(answers.id, id), eq(answers.creatorId, userId), eq(answers.deleted, false)))
    .returning({ id: answers.id });

  const answerToReturn = await db.query.answers.findFirst({
    where: () => eq(answers.id, updatedAnswer[0].id),
    with: {
      author: true,
      question: {
        with: {
          author: true,
        },
        columns: {
          deleted: false,
        },
      },
    },
    columns: { deleted: false },
  });

  return answerToReturn as NonNullable<typeof answerToReturn>;
};

export const deleteAnswer = async ({ id, userId }: Pick<Answer, 'id'> & { userId: number }) => {
  const updatedAnswer = await db
    .update(answers)
    .set({
      deleted: true,
      updatedAt: new Date(),
    })
    .where(and(eq(answers.id, id), eq(answers.creatorId, userId), eq(answers.deleted, false)))
    .returning({ id: answers.id });

  const answerToReturn = await db.query.answers.findFirst({
    where: () => eq(answers.id, updatedAnswer[0].id),
    with: {
      author: true,
      question: {
        with: {
          author: true,
        },
        columns: {
          deleted: false,
        },
      },
    },
    columns: { deleted: false },
  });
  return answerToReturn as NonNullable<typeof answerToReturn>;
};
