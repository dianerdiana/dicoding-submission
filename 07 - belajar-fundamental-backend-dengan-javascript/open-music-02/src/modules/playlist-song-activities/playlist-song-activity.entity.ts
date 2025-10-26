import { nanoid } from 'nanoid';

export interface PlaylistSongActivityEntity {
  id: string;
  playlistId: string;
  songId: string;
  userId: string;
  action: string;
  time: string;
  createdAt: string;
  updatedAt: string;
}

export class PlaylistSongActivity implements PlaylistSongActivityEntity {
  id: string;
  playlistId: string;
  songId: string;
  userId: string;
  action: string;
  time: string;
  createdAt: string;
  updatedAt: string;

  constructor({
    id,
    playlistId,
    songId,
    userId,
    action,
  }: Omit<PlaylistSongActivityEntity, 'createdAt' | 'updatedAt' | 'time'>) {
    this.id = id ? id : nanoid(16);
    this.playlistId = playlistId;
    this.songId = songId;
    this.userId = userId;
    this.action = action;

    const timestamp = new Date().toISOString();
    this.time = timestamp;
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }
}
