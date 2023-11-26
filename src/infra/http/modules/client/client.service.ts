import { ClientRepository } from '@/domain/client/application/repositories/client-repository'
import {
  RegisterClientInput,
  RegisterClientUseCase,
} from '@/domain/client/application/use-cases/register-client'
import { BcryptHasher } from '../../cryptograph'
import { BadRequestError } from '../../errors'

export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly bcryptHasher: BcryptHasher,
  ) {}

  async register(data: RegisterClientInput) {
    const useCase = new RegisterClientUseCase(
      this.clientRepository,
      this.bcryptHasher,
    )

    const result = await useCase.execute(data)

    if (result.isLeft()) {
      const error = result.value
      throw new BadRequestError(error.message)
    }
  }
}
