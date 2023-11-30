import { InMemoryClientRepository } from '@test/repositories/client/in-memory-client.repository'
import { CreateOrderUseCase } from './create-order'
import { InMemoryOrderRepository } from '@test/repositories/order/in-memory-order.repository'
import { InMemoryProductRepository } from '@test/repositories/product/in-memory-product.repository'
import { makeClient } from '@test/factories/make-client'
import { UniqueEntityID } from '@/common/entities/unique-entity-id'
import { makeProduct } from '@test/factories/make-products'
import { ProductNotFoundError } from '@/domain/product/application/use-cases/errors/product-not-found.error'
import { ProductNotAvailableError } from '@/domain/product/application/use-cases/errors'

let clientRepository: InMemoryClientRepository
let orderRepository: InMemoryOrderRepository
let productRepository: InMemoryProductRepository

let sut: CreateOrderUseCase

describe('Create Order UseCase', () => {
  beforeEach(() => {
    clientRepository = new InMemoryClientRepository()
    orderRepository = new InMemoryOrderRepository()
    productRepository = new InMemoryProductRepository()

    sut = new CreateOrderUseCase(
      orderRepository,
      clientRepository,
      productRepository,
    )
  })

  it('should be able to create a order', async () => {
    const clientId = new UniqueEntityID()
    const client = makeClient({}, clientId)
    clientRepository.items.push(client)

    for (let index = 0; index < 3; index++) {
      const product = makeProduct({}, new UniqueEntityID())
      productRepository.items.push(product)
    }

    const productsIds = productRepository.items.map((product) =>
      product.id.toString(),
    )

    const result = await sut.execute({
      clientId: clientId.toString(),
      productsIds,
    })

    expect(result.isRight()).toBeTruthy()
    expect(orderRepository.items[0].clientId).toEqual(clientId)
  })

  it('should not be able to create order if client does not exists', async () => {
    const clientId = new UniqueEntityID()

    for (let index = 0; index < 3; index++) {
      const product = makeProduct({}, new UniqueEntityID())
      productRepository.items.push(product)
    }

    const productsIds = productRepository.items.map((product) =>
      product.id.toString(),
    )

    const result = await sut.execute({
      clientId: clientId.toString(),
      productsIds,
    })

    expect(result.isLeft()).toBeTruthy()
  })

  it('should not be able to create order if product does not exists', async () => {
    const clientId = new UniqueEntityID()
    const client = makeClient({}, clientId)
    clientRepository.items.push(client)

    const productsIds = ['1', '2', '3']

    const result = await sut.execute({
      clientId: clientId.toString(),
      productsIds,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ProductNotFoundError)
  })

  it('should not be able to create order if product is not available', async () => {
    const clientId = new UniqueEntityID()
    const client = makeClient({}, clientId)
    clientRepository.items.push(client)

    for (let index = 0; index < 3; index++) {
      const product = makeProduct({ quantity: 0 }, new UniqueEntityID())
      productRepository.items.push(product)
    }

    const productsIds = productRepository.items.map((product) =>
      product.id.toString(),
    )

    const result = await sut.execute({
      clientId: clientId.toString(),
      productsIds,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ProductNotAvailableError)
  })
})
