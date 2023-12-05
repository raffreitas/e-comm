import { DomainError } from '@/common/errors/domain-errors'

export class InvalidQuantityError extends DomainError {
  constructor(quantity: number) {
    super(`Invalid quantity: ${quantity}`)
  }
}
