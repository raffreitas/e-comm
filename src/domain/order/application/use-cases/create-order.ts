import { Either, left, right } from '@/common/either'
import { OrderRepository } from '../repositories/order.repository'
import { Order, OrderStatusEnum } from '../../enterprise/order.entity'
import { ClientRepository } from '@/domain/client/application/repositories/client-repository'
import { ClientNotFoundError } from '@/domain/client/application/use-cases/errors'
import { ProductRepository } from '@/domain/product/application/repositories/product.repository'
import {
  ProductNotFoundError,
  ProductNotAvailableError,
} from '@/domain/product/application/use-cases/errors'

export interface CreateOrderInput {
  clientId: string
  productsIds: string[]
}

type CreateOrderOutput = Either<
  ClientNotFoundError | ProductNotFoundError | ProductNotAvailableError,
  { order: Order }
>

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly clientRepository: ClientRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    const { clientId, productsIds } = input

    const client = await this.clientRepository.findById(clientId)

    if (!client) {
      return left(new ClientNotFoundError())
    }

    try {
      // verify if products exists and are available
      const availableProducts = await Promise.all(
        productsIds.map(async (productId) => {
          const product = await this.productRepository.findById(productId)

          if (!product) {
            throw new ProductNotFoundError(productId)
          }

          if (product.quantity === 0) {
            throw new ProductNotAvailableError(productId)
          }

          return product
        }),
      )

      // create order

      const order = Order.create({
        clientId: client.id,
        products: availableProducts,
        status: OrderStatusEnum.PENDING,
      })

      await this.orderRepository.create(order)

      return right({ order })
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        return left(error)
      }
      if (error instanceof ProductNotAvailableError) {
        return left(error)
      }

      throw error
    }
  }
}
