import { Entity } from '@/common/entities/entity'
import { UniqueEntityID } from '@/common/entities/unique-entity-id'

import { Product } from '@/domain/product/enterprise/product.entity'

export enum OrderStatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
  FINISHED = 'FINISHED',
}

export interface OrderProps {
  clientId: UniqueEntityID
  products: Product[]
  status: OrderStatusEnum
  createdAt?: Date
}

export class Order extends Entity<OrderProps> {
  get clientId() {
    return this.props.clientId
  }

  get products() {
    return this.props.products
  }

  get status() {
    return this.props.status
  }

  get total() {
    return this.calculateTotal()
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: OrderProps, id?: UniqueEntityID) {
    const order = new Order(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return order
  }

  private calculateTotal() {
    const total = this.props.products.reduce((total, product) => {
      return total + product.price
    }, 0)

    return total
  }
}
