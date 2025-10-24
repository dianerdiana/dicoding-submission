import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('playlist_song_activities', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    playlist_id: {
      type: 'uuid',
      references: 'playlists',
      onDelete: 'CASCADE',
    },
    song_id: {
      type: 'uuid',
      references: 'songs',
      onDelete: 'CASCADE',
    },
    user_id: {
      type: 'uuid',
      references: 'users',
      onDelete: 'CASCADE',
    },
    action: { type: 'varchar(255)', notNull: true },
    time: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('now()'),
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
  pgm.dropTable('playlist_song_activities');
}
