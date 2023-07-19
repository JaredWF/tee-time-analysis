import Database from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import { DB } from 'kysely-codegen';

const db = new Database('tee-times.db', { verbose: console.log });

console.log('hello world!');

const kyselyDb = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: db
  }),
});

while(true) {}