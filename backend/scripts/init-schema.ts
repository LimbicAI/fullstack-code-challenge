import { writeFileSync } from 'fs';
import path from 'path';
import { graphqlSchema } from '../graphql';

writeFileSync(path.resolve(__dirname, '../schema.graphql'), graphqlSchema);
