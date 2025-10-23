import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('songs', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    title: { type: 'varchar(255)', notNull: true },
    year: { type: 'integer', notNull: true },
    performer: { type: 'varchar(255)', notNull: true },
    genre: { type: 'varchar(100)', notNull: true },
    duration: { type: 'integer' },
    album_id: {
      type: 'uuid',
      references: 'albums',
      onDelete: 'CASCADE',
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('now()'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('now()'),
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('songs');
}
