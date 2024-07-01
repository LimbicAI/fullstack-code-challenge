import dateScalar from '../scalars/date';
import { Resolvers } from '../../generated-types';
import { Context } from '../context';

const resolvers: Resolvers<Context> = {
  Date: dateScalar,
};

export default resolvers;
