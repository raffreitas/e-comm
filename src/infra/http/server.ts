import { pgPool } from '../database/pg'
import { migrateTables } from '../database/pg/migrations'
import { app } from './app'
;(async () => {
  await migrateTables(pgPool)

  await app.ready()

  app
    .listen({
      port: 3000,
    })
    .then(() => {
      console.log(`🚀 Server is running on http://localhost:3000`)
    })
    .catch(() => {
      console.log(`❌ Server failed to start`)
    })
})()
