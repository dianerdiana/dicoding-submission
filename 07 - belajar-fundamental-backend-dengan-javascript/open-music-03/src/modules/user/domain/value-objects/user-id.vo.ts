import { nanoid } from 'nanoid';

export class UserId {
  private readonly value: string;

  constructor(id?: string) {
    this.value = id || nanoid();
  }

  toString(): string {
    return this.value;
  }

  equals(other: UserId) {
    return this.value === other.value;
  }
}
