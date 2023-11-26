import fastify from 'fastify'
import { ZodError } from 'zod'
import { appRoutes } from './modules'
import { HttpError } from './errors'
import { env } from '../env'

export const app = fastify()

app.register(appRoutes, { prefix: '/api/fastify' })

app.setErrorHandler((error, _, reply) => {
  if (error instanceof HttpError) {
    return reply
      .status(error.statusCode)
      .send({ message: error.message, errorCode: error.statusCode })
  }

  if (error instanceof ZodError) {
    const issues = error.issues.map((issue) => ({
      path: issue.path,
      message: issue.message,
    }))

    return reply.status(400).send({ message: 'Validation error', issues })
  }

  if (env.NODE_ENV === 'development') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
