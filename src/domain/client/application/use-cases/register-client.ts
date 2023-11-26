import { Either, left, right } from '@/common/either'
import { Client } from '../../enterprise/entities/client.entity'
import { CPF } from '../../enterprise/entities/value-objects/cpf'
import { ClientRepository } from '../repositories/client-repository'
import { HashGenerator } from '../cryptography'
import { InvalidCPFError, ClientAlreadyExistsError } from './errors'

export interface RegisterClientInput {
  name: string
  email: string
  password: string
  document: string
}

type RegisterClientOutput = Either<
  ClientAlreadyExistsError | InvalidCPFError,
  { client: Client }
>

export class RegisterClientUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({
    document: rawDocument,
    email,
    name,
    password,
  }: RegisterClientInput): Promise<RegisterClientOutput> {
    const clientWithSameEmail = await this.clientRepository.findByEmail(email)

    if (clientWithSameEmail) {
      return left(new ClientAlreadyExistsError('email'))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    let document: CPF
    try {
      document = CPF.create(rawDocument)
    } catch (error) {
      return left(new InvalidCPFError())
    }

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
