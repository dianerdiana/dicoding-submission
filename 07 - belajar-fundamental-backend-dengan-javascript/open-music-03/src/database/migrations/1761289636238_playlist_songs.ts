import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('playlist_songs', {
    id: {
      type: 'varchar(21)', // or text, depending on your comfort
      primaryKey: true,
      notNull: true,
    },
    playlist_id: {
      type: 'varchar(21)',
      references: 'playlists',
      onDelete: 'CASCADE',
    },
    song_id: {
      type: 'varchar(21)',
      references: 'songs',
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
  pgm.dropTable('playlist_songs');
}
