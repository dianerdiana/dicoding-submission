import { nanoid } from 'nanoid';

export class AuthId {
  private readonly value: string;

  constructor(id?: string) {
    this.value = id || nanoid();
  }

  toString(): string {
    return this.value;
  }

  equals(other: AuthId) {
    return this.value === other.value;
  }
}
