import { pgQuery } from '../../index'
import { Client } from '@/domain/client/enterprise/entities/client.entity'
import { ClientRepository } from '@/domain/client/application/repositories/client-repository'
import { ClientPGMapper } from '../../mappers/client/client.mapper'
import { ClientModel } from '@/infra/database/models/client.model'

export class PGClientRepository implements ClientRepository {
  async create(client: Client) {
    const { id, name, document, email, password } =
      ClientPGMapper.toPostgres(client)

    const sql = `
      INSERT INTO clients(id, name, document, email, password)
      VALUES($1, $2, $3, $4, $5)
    `

    await pgQuery(sql, [id, name, document, email, password])
  }

  async findByEmail(email: string): Promise<Client | null> {
    const sql = `
      SELECT * FROM clients WHERE email = $1
    `

    const result = await pgQuery<ClientModel>(sql, [email])

    if (!result.rows.length) {
      return null
    }

    return ClientPGMapper.toDomain(result.rows[0])
  }
}
