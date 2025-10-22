import { nanoid } from 'nanoid';

export interface AlbumProps {
  id: string;
  name: string;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export class Album implements AlbumProps {
  id: string;
  name: string;
  year: number;
  createdAt: string;
  updatedAt: string;

  constructor({ name, year }: Omit<AlbumProps, 'id' | 'createdAt' | 'updatedAt'>) {
    this.id = nanoid(16);
    this.name = name;
    this.year = year;

    const timestamp = new Date().toISOString();
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }

  update({ name, year }: Partial<Omit<AlbumProps, 'id' | 'createdAt' | 'updatedAt'>>) {
    if (name !== undefined) this.name = name;
    if (year !== undefined) this.year = year;

    this.updatedAt = new Date().toISOString();
  }
}
