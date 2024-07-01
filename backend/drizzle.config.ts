import { defineConfig } from 'drizzle-kit';
import config from './config/index';

export default defineConfig({
  schema: ['db/schemas/answers.ts', 'db/schemas/questions.ts', 'db/schemas/users.ts'],
  out: './drizzle',
  dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: config.db,
});
