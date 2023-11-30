import { Order } from '../../enterprise/order.entity'

export interface OrderRepository {
  create(order: Order): Promise<void>
}
