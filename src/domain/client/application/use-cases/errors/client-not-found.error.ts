import { DomainError } from '@/common/errors/domain-errors'

export class ClientNotFoundError extends DomainError {
  constructor() {
    super('Client not found')
  }
}
