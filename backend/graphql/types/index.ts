import { readdirSync, readFileSync } from 'fs';
import path from 'path';

const currentDirPath = path.resolve(__dirname, './');
const files = readdirSync(currentDirPath).map((file) =>
  file.endsWith('.ts')
    ? ''
    : readFileSync(path.resolve(currentDirPath, file), {
        encoding: 'utf-8',
      }),
);

export const typeDefs = files;
