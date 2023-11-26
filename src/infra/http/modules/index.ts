import { FastifyInstance } from 'fastify'
import { clientRoutes } from './client/client.router'

export async function appRoutes(app: FastifyInstance) {
  app.register(clientRoutes, { prefix: '/client' })
}
