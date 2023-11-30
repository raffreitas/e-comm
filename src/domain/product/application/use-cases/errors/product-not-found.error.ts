import { DomainError } from '@/common/errors/domain-errors'

export class ProductNotFoundError extends DomainError {
  constructor(identifier: string) {
    super(`Product with id "${identifier}" not found`)
  }
}
