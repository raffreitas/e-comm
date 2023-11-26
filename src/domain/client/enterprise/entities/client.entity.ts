import { Entity } from '@/common/entities/entity'
import { UniqueEntityID } from '@/common/entities/unique-entity-id'

export interface ClientProps {
  name: string
  email: string
  password: string
  document: string
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

  static create(props: ClientProps, id?: UniqueEntityID) {
    const client = new Client(props, id)
    return client
  }
}
