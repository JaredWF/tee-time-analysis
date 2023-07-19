import * as path from 'path'
import { promises as fs } from 'fs'
import {
  Kysely,
  Migrator,
  FileMigrationProvider,
  SqliteDialect
} from 'kysely'
import Database from 'better-sqlite3';
import { DB } from 'kysely-codegen';


async function migrateToLatest() {
  const db = new Database('tee-times.db', { verbose: console.log });

  const kyselyDb = new Kysely<DB>({
    dialect: new SqliteDialect({
      database: db
    }),
  });

  const migrator = new Migrator({
    db: kyselyDb,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, './migrations'),
    })
  })

  const { error, results } = await migrator.migrateToLatest()

  console.log(results);

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await kyselyDb.destroy()
}

migrateToLatest()