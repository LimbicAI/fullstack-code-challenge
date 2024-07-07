import knex from 'knex';

const dbConfig = require('../knexfile.ts');
const db: any = knex(dbConfig);

import { up as initDB } from './migrations/0_initialize_database';
import { seed as seedDB } from './seeds/0_fill_all_tables_with_dummy_data';

// Adding prefix to table names
db.prefix = dbConfig.prefix;
db.tables = dbConfig.tables;

if(db.prefix && db.tables){
  for (const key in db.tables) {
    db.tables[key] = db.prefix + db.tables[key]
  }
}

(async () => {
    // Checking if DB Connected
    const dbInfo = dbConfig.client + ":" + dbConfig.connection.host + ":" + dbConfig.connection.port + ":" + dbConfig.connection.database;
    
    await db.select(1).then(async () => {
      console.log(dbInfo + " connected");

      // Check if DB is initialized for the first time, we need to create tables and seed them
      const hasUserTable = await db.schema.hasTable(db.tables.user);
      if(!hasUserTable){
        console.log("Initializing Database for the first time...");
        await initDB(db);
        await seedDB(db);
      }
    })
    .catch((error: any) => {
      console.log(dbInfo + " not connected");
      //console.error(error);
    });
})();

export default db;