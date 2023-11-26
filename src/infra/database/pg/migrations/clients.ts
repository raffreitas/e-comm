const createClientsTable = `
  CREATE TABLE IF NOT EXISTS clients (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    document VARCHAR(255) NOT NULL
  )
`
const addCreatedAtColumn = `
  ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT NOW()
`

export const clientMigrations = [createClientsTable, addCreatedAtColumn]
