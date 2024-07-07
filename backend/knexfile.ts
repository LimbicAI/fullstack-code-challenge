import path from 'path';
import { URL } from 'url';

import config from "./src/config";

if(!config.databaseUrl){
  console.error('DATABASE_URL is not set in env!');
  process.exit(1);
}

const dbUrl: URL = new URL(config.databaseUrl);

module.exports = {
  client: 'pg',
  connection: {
    host: dbUrl.hostname,
    port: dbUrl.port,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.split('/')[1],
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.join(__dirname, 'src', 'migrations'),
  },
  seeds: {
    directory: path.join(__dirname, 'src', 'seeds'),
  },
  // Extra Configurations
  prefix: 'lim24_',
  tables: {
    user: 'user',
    question: 'question',
    answer: 'answer',
  }
};