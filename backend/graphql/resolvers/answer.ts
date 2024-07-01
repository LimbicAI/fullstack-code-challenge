import * as answersService from '../../services/answers';

import { Resolvers } from '../../generated-types';
import { Context } from '../context';

const resolvers: Resolvers<Context> = {
  Query: {
    questionAnswers: async (_, { limit, offset, id }) => {
      return answersService.listQuestionAnswers({ id, limit, offset });
    },
  },
  Mutation: {
    addAnswer: async (_, { answer, questionId }, { userId }) => {
      return await answersService.addAnswer({ answer, questionId, creatorId: userId });
    },
    editAnswer: async (_, { answerId, answer }, { userId }) => {
      return await answersService.editAnswer({ id: answerId, answer, userId: userId });
    },
    deleteAnswer: async (_, { answerId }, { userId }) => {
      return await answersService.deleteAnswer({ id: answerId, userId });
    },
  },
};

export default resolvers;
