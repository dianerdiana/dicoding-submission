import { DomainError } from './domain.error.js';

export class InvalidNumberError extends DomainError {
  constructor(label: string = 'Field') {
    super(`${label} must be a valid number.`, 'INVALID_NUMBER');
  }
}
