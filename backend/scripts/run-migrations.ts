import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import config from '../config';
import * as schema from '../db/schemas';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const client = new Client(
  `postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`,
);

// This will run migrations on the database, skipping the ones already applied
const runMigrations = async () => {
  try {
    await client.connect();
    const db = drizzle(client, { schema });
    await migrate(db, { migrationsFolder: './migrations' });

    await client.end();
  } catch (error) {
    console.error('SOMETHING WENT WRONG', error);
  }
};

runMigrations();
