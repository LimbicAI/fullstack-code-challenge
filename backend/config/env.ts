import * as z from 'zod';

const envSchema = z.object({
  POSTGRES_DB: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  API_VERSION: z.coerce.number(),
  SECRET: z.string(),
  REFRESH_SECRET: z.string(),
  NODE_ENV: z.enum(['development', 'production']),
});

const environmentVariables = envSchema.parse(process.env);

export default environmentVariables;
