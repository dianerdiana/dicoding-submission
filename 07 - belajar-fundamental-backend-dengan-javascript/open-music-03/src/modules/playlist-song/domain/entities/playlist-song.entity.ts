import { BaseEntity } from '../../../../shared/domains/entities/base.entity';
import { InvalidRequiredError } from '../../../../shared/domains/errors/invalid-required.error';
import { PlaylistSongId } from '../value-objects/playlist-song-id.vo';

export interface PlaylistSongProps {
  id: PlaylistSongId;
  playlistId: string;
  songId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PlaylistSong extends BaseEntity<PlaylistSongId> {
  private playlistId: string;
  private songId: string;

  constructor(props: PlaylistSongProps) {
    const { id, playlistId, songId, createdAt, updatedAt } = props;

    super(id, createdAt, updatedAt);
    this.playlistId = playlistId;
    this.songId = songId;
  }

  static create({ playlistId, songId }: Omit<PlaylistSongProps, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!playlistId || playlistId.trim().length === 0) {
      throw new InvalidRequiredError('PlaylistId');
    }

    if (!songId || songId.trim().length === 0) {
      throw new InvalidRequiredError('SongId');
    }

    const now = new Date();
    return new PlaylistSong({
      id: new PlaylistSongId(),
      playlistId,
      songId,
      createdAt: now,
      updatedAt: now,
    });
  }

  getPlaylistId(): string {
    return this.playlistId;
  }

  getSongId(): string {
    return this.songId;
  }

  updatePlaylistId(playlistId: string) {
    if (!playlistId || playlistId.trim().length === 0) {
      throw new InvalidRequiredError('PlaylistId');
    }

    this.playlistId = playlistId;
    this.updatedAt = new Date();
  }

  updateSongId(songId: string) {
    if (!songId || songId.trim().length === 0) {
      throw new InvalidRequiredError('SongId');
    }

    this.songId = songId;
    this.updatedAt = new Date();
  }

  toPrimitives() {
    return {
      id: this.getId().toString(),
      playlistId: this.getPlaylistId(),
      songId: this.getSongId(),
      createdAt: this.getCreatedAt().toISOString(),
      updatedAt: this.getUpdatedAt().toISOString(),
    };
  }
}
