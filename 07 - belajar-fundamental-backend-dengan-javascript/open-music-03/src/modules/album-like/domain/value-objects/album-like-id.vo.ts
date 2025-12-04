import { nanoid } from 'nanoid';

export class AlbumLikeId {
  private readonly value: string;

  constructor(id?: string) {
    this.value = id || nanoid();
  }

  toString(): string {
    return this.value;
  }

  equals(other: AlbumLikeId) {
    return this.value === other.value;
  }
}
