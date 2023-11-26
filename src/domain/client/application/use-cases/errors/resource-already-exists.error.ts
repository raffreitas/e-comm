import { DomainError } from '@/common/errors/domain-errors'

export class ResourceAlreadyExistsError extends DomainError {
  constructor() {
    super('Resource already exists')
  }
}
