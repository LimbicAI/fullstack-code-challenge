import { BaseContext } from '@apollo/server';
import { Resolvers } from '../../generated-types';
import dateScalar from './date';
import answersResolvers from './answer';
import questionsResolvers from './question';
import usersResolvers from './user';
import versionResolvers from './version';

const allResolvers = [
  answersResolvers,
  questionsResolvers,
  usersResolvers,
  dateScalar,
  versionResolvers,
] as Resolvers<BaseContext>[];

export default allResolvers;
