import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import config from '../config';
import * as schema from './schemas';

const pool = new Pool(config.db);

const db = drizzle(pool, { schema });

export default db;
