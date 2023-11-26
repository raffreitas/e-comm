import { DomainError } from '@/common/errors/domain-errors'

export class InvalidCPFError extends DomainError {
  constructor() {
    super('Invalid CPF')
  }
}
