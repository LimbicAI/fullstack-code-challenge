import * as userService from '../../services/users';
import { Resolvers } from '../../generated-types';
import { BaseContext } from '@apollo/server';

const resolvers: Resolvers<BaseContext> = {
  Query: {
    users: async (_, { limit, offset }) => {
      return await userService.listUsers({ limit, offset });
    },
    userAnswers: async (_, { limit, offset, userId }) => {
      return await userService.listUserAnswers({ userId, limit, offset });
    },
    userQuestions: async (_, { limit, offset, userId }) => {
      return await userService.listUserQuestions({ userId, limit, offset });
    },
  },
};
resolvers.Query?.userQuestions;

export default resolvers;
