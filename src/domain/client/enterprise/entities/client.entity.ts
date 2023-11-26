import { Entity } from '@/common/entities/entity'
import { UniqueEntityID } from '@/common/entities/unique-entity-id'
import { CPF } from './value-objects/cpf'

export interface ClientProps {
  name: string
  email: string
  password: string
  document: CPF
  createdAt?: Date
}

export class Client extends Entity<ClientProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get document() {
    return this.props.document
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: ClientProps, id?: UniqueEntityID) {
    const client = new Client(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return client
  }
}
