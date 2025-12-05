import { nanoid } from 'nanoid';

export class PlaylistSongId {
  private readonly value: string;

  constructor(id?: string) {
    this.value = id || nanoid();
  }

  toString(): string {
    return this.value;
  }

  equals(other: PlaylistSongId) {
    return this.value === other.value;
  }
}
