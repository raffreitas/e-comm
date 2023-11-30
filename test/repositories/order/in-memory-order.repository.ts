import { OrderRepository } from '@/domain/order/application/repositories/order.repository'
import { Order } from '@/domain/order/enterprise/order.entity'

export class InMemoryOrderRepository implements OrderRepository {
  items: Order[] = []

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }
}
