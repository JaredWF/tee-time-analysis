import Database from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import { DB } from 'kysely-codegen';

const path = require('path');

export function startDB() {
  console.log('starting db');

  const db = new Database(path.join(__dirname, 'tee-times.db'), { verbose: console.log });
  
  const kyselyDb = new Kysely<DB>({
    dialect: new SqliteDialect({
      database: db
    }),
  });

  console.log('DB started');

  return kyselyDb;
}