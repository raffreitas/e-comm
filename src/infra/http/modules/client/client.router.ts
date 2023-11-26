import { FastifyInstance } from 'fastify'
import { ClientController } from './client.controller'
import { ClientService } from './client.service'
import { PGClientRepository } from '@/infra/database/pg/repositories/client/client-repository'
import { BcryptHasher } from '../../cryptograph'

export async function clientRoutes(app: FastifyInstance) {
  const pgClientRepository = new PGClientRepository()
  const bcryptHasher = new BcryptHasher()
  const clientService = new ClientService(pgClientRepository, bcryptHasher)
  const clientController = new ClientController(clientService)

  //
  app.post('/', clientController.createClient)
}
