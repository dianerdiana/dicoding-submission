import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('songs', {
    id: {
      type: 'varchar(21)', // or text, depending on your comfort
      primaryKey: true,
      notNull: true,
    },
    title: { type: 'varchar(255)', notNull: true },
    year: { type: 'integer', notNull: true },
    performer: { type: 'varchar(255)', notNull: true },
    genre: { type: 'varchar(100)', notNull: true },
    duration: { type: 'integer' },
    album_id: {
      type: 'varchar(21)',
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
