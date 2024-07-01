import { BaseContext } from '@apollo/server';
import { Resolvers } from '../../generated-types';
import config from '../../config';

const resolvers: Resolvers<BaseContext> = {
  Query: {
    version: () => `${config.version}`,
  },
};

export default resolvers;
