import { env } from '@/infra/env'
import { Pool } from 'pg'

const pgPool = new Pool({
  connectionString: env.DATABASE_URI,
})

export async function pgQuery<T>(sql: string, params?: unknown[]) {
  const { command, fields, oid, rowCount, rows } = await pgPool.query(
    sql,
    params,
  )

  return {
    command,
    fields,
    oid,
    rowCount,
    rows: rows as T[],
  }
}
