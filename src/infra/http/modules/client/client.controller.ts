import { FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ClientService } from './client.service'

export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  createClient = async (request: FastifyRequest) => {
    const createClientSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      document: z.string(),
    })

    const { document, email, name, password } = createClientSchema.parse(
      request.body,
    )

    await this.clientService.register({
      document,
      email,
      name,
      password,
    })
  }
}
