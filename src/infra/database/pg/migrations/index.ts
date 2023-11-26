import { Pool } from 'pg'

import { clientMigrations } from './clients'

export async function migrateTables(client: Pool) {
  Promise.all([
    [clientMigrations].map((migration) => {
      return client.query(migration.join(';'))
    }),
  ])
}
