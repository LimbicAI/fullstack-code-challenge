import gql from 'graphql-tag';
import { mutationDefs } from './mutations';

import { queryDefs } from './queries';

import { typeDefs } from './types';

export const graphqlSchema = [...typeDefs, ...queryDefs, ...mutationDefs].join('\n');

export default gql(graphqlSchema);
