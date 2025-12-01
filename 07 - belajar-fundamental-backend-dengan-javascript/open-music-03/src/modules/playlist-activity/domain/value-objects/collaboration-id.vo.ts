import { nanoid } from 'nanoid';

export class CollaborationId {
  private readonly value: string;

  constructor(id?: string) {
    this.value = id || nanoid();
  }

  toString(): string {
    return this.value;
  }

  equals(other: CollaborationId) {
    return this.value === other.value;
  }
}
