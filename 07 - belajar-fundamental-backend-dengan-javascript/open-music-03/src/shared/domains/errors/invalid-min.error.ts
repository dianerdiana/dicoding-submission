import { DomainError } from './domain.error';

export class InvalidMinError extends DomainError {
  constructor(label: string = 'Field', min: number = 1) {
    super(`${label} must be at least ${min} characters long.`, 'INVALID_MIN');
  }
}
