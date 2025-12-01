import { nanoid } from 'nanoid';

export class PlaylistSongActivityId {
  private readonly value: string;

  constructor(id?: string) {
    this.value = id || nanoid();
  }

  toString(): string {
    return this.value;
  }

  equals(other: PlaylistSongActivityId) {
    return this.value === other.value;
  }
}
