import { UniqueEntityID } from '@/common/entities/unique-entity-id'
import { Client } from '@/domain/client/enterprise/entities/client.entity'
import { CPF } from '@/domain/client/enterprise/entities/value-objects/cpf'
import { ClientModel } from '@/infra/database/models/client.model'

export class ClientPGMapper {
  static toDomain(client: ClientModel): Client {
    return Client.create(
      {
        name: client.name,
        email: client.email,
        password: client.password,
        document: CPF.create(client.document),
        createdAt: client.createdAt,
      },
      new UniqueEntityID(client.id),
    )
  }

  static toPostgres(client: Client): ClientModel {
    return {
      id: client.id.toString(),
      name: client.name,
      email: client.email,
      password: client.password,
      document: client.document.toString(),
      createdAt: client.createdAt,
    }
  }
}
