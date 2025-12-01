import { BaseEntity } from '../../../../shared/domains/entities/base.entity';
import { InvalidRequiredError } from '../../../../shared/domains/errors/invalid-required.error';
import { PlaylistSongActivityId } from '../value-objects/playlist-song-activity-id.vo';

export interface PlaylistSongActivityProps {
  id: PlaylistSongActivityId;
  playlistId: string;
  songId: string;
  userId: string;
  action: string;
  time: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PlaylistSongActivity extends BaseEntity<PlaylistSongActivityId> {
  private playlistId: string;
  private songId: string;
  private userId: string;
  private action: string;
  private time: string;

  constructor(props: PlaylistSongActivityProps) {
    const { id, playlistId, songId, userId, action, time, createdAt, updatedAt } = props;

    super(id, createdAt, updatedAt);
    this.playlistId = playlistId;
    this.songId = songId;
    this.userId = userId;
    this.action = action;
    this.time = time;
  }

  static create({
    playlistId,
    songId,
    userId,
    action,
  }: Omit<PlaylistSongActivityProps, 'id' | 'time' | 'createdAt' | 'updatedAt'>) {
    if (!userId || userId.trim().length === 0) {
      throw new InvalidRequiredError('User ID');
    }

    if (!playlistId || playlistId.trim().length === 0) {
      throw new InvalidRequiredError('Playlist ID');
    }

    if (!songId || songId.trim().length === 0) {
      throw new InvalidRequiredError('Song ID');
    }

    const now = new Date();
    return new PlaylistSongActivity({
      id: new PlaylistSongActivityId(),
      playlistId,
      songId,
      userId,
      action,
      time: now.toISOString(),
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

  getUserId(): string {
    return this.userId;
  }

  getAction(): string {
    return this.action;
  }

  getTime(): string {
    return this.time;
  }

  updatePlaylistId(playlistId: string) {
    if (!playlistId || playlistId.trim().length === 0) {
      throw new InvalidRequiredError('Playlist ID');
    }

    this.playlistId = playlistId;
    this.updatedAt = new Date();
  }

  updateSongId(songId: string) {
    if (!songId || songId.trim().length === 0) {
      throw new InvalidRequiredError('Song ID');
    }

    this.songId = songId;
    this.updatedAt = new Date();
  }

  updateUserId(userId: string) {
    if (!userId || userId.trim().length === 0) {
      throw new InvalidRequiredError('User ID');
    }

    this.userId = userId;
    this.updatedAt = new Date();
  }

  toPrimitives() {
    return {
      id: this.getId().toString(),
      playlistId: this.getPlaylistId(),
      songId: this.getSongId(),
      userId: this.getUserId(),
      action: this.getAction(),
      time: this.getTime(),
      createdAt: this.getCreatedAt().toISOString(),
      updatedAt: this.getUpdatedAt().toISOString(),
    };
  }
}
