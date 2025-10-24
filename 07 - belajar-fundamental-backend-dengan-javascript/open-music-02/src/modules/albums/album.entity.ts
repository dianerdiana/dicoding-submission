import { nanoid } from 'nanoid';

export interface AlbumEntity {
  id: string;
  name: string;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export class Album implements AlbumEntity {
  id: string;
  name: string;
  year: number;
  createdAt: string;
  updatedAt: string;

  constructor({ name, year }: Omit<AlbumEntity, 'id' | 'createdAt' | 'updatedAt'>) {
    this.id = nanoid(16);
    this.name = name;
    this.year = year;

    const timestamp = new Date().toISOString();
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }

  update({ name, year }: Partial<Omit<AlbumEntity, 'id' | 'createdAt' | 'updatedAt'>>) {
    if (name !== undefined) this.name = name;
    if (year !== undefined) this.year = year;

    this.updatedAt = new Date().toISOString();
  }
}
