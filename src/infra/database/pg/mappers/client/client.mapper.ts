import { UniqueEntityID } from '@/common/entities/unique-entity-id'
import { Client } from '@/domain/client/enterprise/entities/client.entity'
import { ClientModel } from '@/infra/database/models/client.model'

export class ClientPGMapper {
  static toDomain(client: ClientModel) {
    return Client.create(
      {
        name: client.name,
        email: client.email,
        password: client.password,
        document: client.document,
      },
      new UniqueEntityID(client.id),
    )
  }

  static toPostgres(client: Client) {
    return {
      id: client.id.toString(),
      name: client.name,
      email: client.email,
      password: client.password,
      document: client.document,
    }
  }
}
