import { DomainError } from '@/common/errors/domain-errors'

export class ProductNotAvailableError extends DomainError {
  constructor(productId: string) {
    super(`Product with id ${productId} is not available`)
  }
}
