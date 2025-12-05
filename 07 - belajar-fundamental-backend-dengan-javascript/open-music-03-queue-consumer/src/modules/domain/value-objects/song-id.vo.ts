import { nanoid } from 'nanoid';

export class SongId {
  private readonly value: string;

  constructor(id?: string) {
    this.value = id || nanoid();
  }

  toString(): string {
    return this.value;
  }

  equals(other: SongId) {
    return this.value === other.value;
  }
}
