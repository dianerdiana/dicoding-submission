import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('user_album_likes', {
    id: {
      type: 'varchar(21)', // or text, depending on your comfort
      primaryKey: true,
      notNull: true,
    },
    user_id: {
      type: 'varchar(21)',
      references: 'users',
      onDelete: 'CASCADE',
    },
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
  pgm.dropTable('user_album_likes');
}
