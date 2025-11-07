import { DomainError } from './domain.error';

export class InvalidRequiredError extends DomainError {
  constructor(label: string = 'Field') {
    super(`${label} is required.`, 'INVALID_REQUIRED');
  }
}
