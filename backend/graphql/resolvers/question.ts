import * as questionsService from '../../services/questions';
import { Resolvers } from '../../generated-types';
import { Context } from '../context';

const resolvers: Resolvers<Context> = {
  Query: {
    questions: async (_, { limit, offset }) => {
      console.log(limit, offset);
      return questionsService.listQuestions({ limit, offset });
    },
  },
  Mutation: {
    addQuestion: async (_, { title, description }, { userId }) => {
      return await questionsService.addQuestion({ title, description, authorId: userId });
    },
    editQuestion: async (_, { questionId, title, description }, { userId }) => {
      return await questionsService.editQuestion({ id: questionId, title, description, userId });
    },
    deleteQuestion: async (_, { questionId }, { userId }) => {
      return await questionsService.deleteQuestion({ id: questionId, userId });
    },
  },
};

export default resolvers;
