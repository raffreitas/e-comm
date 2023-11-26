import { Either, left, right } from '@/common/either'
import { Client } from '../../enterprise/entities/client.entity'
import { ClientRepository } from '../repositories/client-repository'
import { ResourceAlreadyExistsError } from './errors/resource-already-exists.error'
import { HashGenerator } from '../cryptography'

export interface RegisterClientInput {
  name: string
  email: string
  password: string
  document: string
}

type RegisterClientOutput = Either<
  ResourceAlreadyExistsError,
  { client: Client }
>

export class RegisterClientUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({
    document,
    email,
    name,
    password,
  }: RegisterClientInput): Promise<RegisterClientOutput> {
    const clientWithSameEmail = await this.clientRepository.findByEmail(email)

    if (clientWithSameEmail) {
      return left(new ResourceAlreadyExistsError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const client = Client.create({
      document,
      email,
      name,
      password: hashedPassword,
    })

    await this.clientRepository.create(client)

    return right({ client })
  }
}
