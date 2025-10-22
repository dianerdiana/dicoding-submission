import { nanoid } from 'nanoid';

export interface SongProps {
  id: string;
  title: string;
  year: number;
  performer: string;
  genre: string;
  duration?: number | null | undefined;
  albumId?: string | null | undefined;
  createdAt: string;
  updatedAt: string;
}

export class Song implements SongProps {
  id: string;
  title: string;
  year: number;
  performer: string;
  genre: string;
  duration?: number;
  albumId?: string;
  createdAt: string;
  updatedAt: string;

  constructor({
    title,
    year,
    performer,
    genre,
    duration,
    albumId,
  }: Omit<SongProps, 'id' | 'createdAt' | 'updatedAt'>) {
    this.id = nanoid(16);
    this.title = title;
    this.year = year;
    this.performer = performer;
    this.genre = genre;
    this.duration = duration ? duration : undefined;
    this.albumId = albumId ? albumId : undefined;

    const timestamp = new Date().toISOString();
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }

  update({
    title,
    year,
    performer,
    genre,
    duration,
    albumId,
  }: Partial<Omit<SongProps, 'id' | 'createdAt' | 'updatedAt'>>) {
    if (title !== undefined) this.title = title;
    if (year !== undefined) this.year = year;
    if (performer !== undefined) this.performer = performer;
    if (genre !== undefined) this.genre = genre;
    if (duration) this.duration = duration;
    if (albumId) this.albumId = albumId;

    this.updatedAt = new Date().toISOString();
  }
}
