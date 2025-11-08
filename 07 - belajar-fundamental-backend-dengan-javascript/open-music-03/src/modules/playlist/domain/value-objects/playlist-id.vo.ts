import { nanoid } from 'nanoid';

export class PlaylistId {
  private readonly value: string;

  constructor(id?: string) {
    this.value = id || nanoid();
  }

  toString(): string {
    return this.value;
  }

  equals(other: PlaylistId) {
    return this.value === other.value;
  }
}
