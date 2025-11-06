import { nanoid } from 'nanoid';

export class AlbumId {
  private readonly value: string;

  constructor(id?: string) {
    this.value = id || nanoid();
  }

  toString(): string {
    return this.value;
  }

  equals(other: AlbumId) {
    return this.value === other.value;
  }
}
