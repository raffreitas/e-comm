import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URI: z.string().url(),
  PORT: z.coerce.number().default(3000),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('⚠️ Invalid environment variables')
  throw new Error(_env.error.message)
}

export const env = _env.data
