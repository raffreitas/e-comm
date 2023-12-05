import { UniqueEntityID } from '@/common/entities/unique-entity-id'
import {
  Client,
  ClientProps,
} from '@/domain/client/enterprise/entities/client.entity'
import { CPF } from '@/domain/client/enterprise/entities/value-objects/cpf'
import { faker } from '@faker-js/faker'

const fakeCpf = [
  '64627807031',
  '41653539062',
  '23050333030',
  '87921203000',
  '84933455040',
]

export function makeClient(
  override?: Partial<ClientProps>,
  id?: UniqueEntityID,
) {
  const client = Client.create(
    {
      document: CPF.create(fakeCpf[Math.floor(Math.random() * fakeCpf.length)]),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return client
}
