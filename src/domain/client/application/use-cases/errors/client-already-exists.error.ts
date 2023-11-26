import { DomainError } from '@/common/errors/domain-errors'

export class ClientAlreadyExistsError extends DomainError {
  constructor(identifier: string) {
    super(`Client "${identifier}" already exists`)
  }
}
