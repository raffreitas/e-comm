import { Client } from '../../enterprise/entities/client.entity'

export interface ClientRepository {
  create(client: Client): Promise<void>
  findByEmail(email: string): Promise<Client | null>
  findById(id: string): Promise<Client | null>
}
