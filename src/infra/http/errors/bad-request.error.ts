import { HttpError } from './http-error'

export class BadRequestError extends HttpError {
  constructor(message: string) {
    const statusCode = 400
    super(message, statusCode)
  }
}
