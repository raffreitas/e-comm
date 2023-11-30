import { ClientRepository } from '@/domain/client/application/repositories/client-repository'
import { Client } from '@/domain/client/enterprise/entities/client.entity'

export class InMemoryClientRepository implements ClientRepository {
  items: Client[] = []

  async create(client: Client): Promise<void> {
    this.items.push(client)
  }

  async findByEmail(email: string): Promise<Client | null> {
    const client = this.items.find((client) => client.email === email)

    if (!client) {
      return null
    }

    return client
  }

  async findById(id: string): Promise<Client | null> {
    const client = this.items.find((client) => client.id.toString() === id)

    if (!client) {
      return null
    }

    return client
  }
}
