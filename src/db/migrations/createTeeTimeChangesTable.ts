import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('tee_time_changes')
    .addColumn('id', 'integer', (col) => col.notNull().autoIncrement().primaryKey())
    .addColumn('course', 'varchar(255)', (col) => col.notNull())
    .addColumn('reservation_date', 'date', (col) => col.notNull())
    .addColumn('reservation_time', 'time', (col) => col.notNull())
    .addColumn('reservation_day_of_week', 'varchar(16)', (col) => col.notNull())
    .addColumn('update_date_time', 'datetime', (col) => col.notNull())
    .addColumn('players_available', 'integer', (col) => col.notNull())
    .addColumn('price_dollars', 'numeric', (col) => col.notNull())
    .execute();

  await db.schema
    .createIndex('tee_time_changes_course_index')
    .on('tee_time_changes')
    .column('course')
    .execute();

  await db.schema
    .createIndex('tee_time_changes_reservation_time_index')
    .on('tee_time_changes')
    .column('reservation_time')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  db.schema.dropTable('tee_time_changes').execute()
}