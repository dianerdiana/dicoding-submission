import { Playlist } from '../domain/entities/playlist.entity';
import { PlaylistId } from '../domain/value-objects/playlist-id.vo';

export interface PlaylistRow {
  id: string;
  name: string;
  owner: string;
  created_at: string;
  updated_at: string;
}

/**
 * Convert database row (snake_case) → entity (camelCase)
 */
export const mapPlaylistRowToEntity = (row: PlaylistRow): Playlist => {
  return new Playlist({
    id: new PlaylistId(row.id),
    name: row.name,
    owner: row.owner,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  });
};

/**
 * Convert entity (camelCase) → database row (snake_case)
 */
export const mapPlaylistEntityToRow = (entity: Playlist): PlaylistRow => {
  const playlist = entity.toPrimitives();

  return {
    id: playlist.id,
    name: playlist.name,
    owner: playlist.owner,
    created_at: playlist.createdAt,
    updated_at: playlist.updatedAt,
  };
};
