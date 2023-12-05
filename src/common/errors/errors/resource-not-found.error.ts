import { DomainError } from '../domain-errors'

export class ResourceNotFoundError extends DomainError {
  constructor() {
    super('Resource not found.')
  }
}
