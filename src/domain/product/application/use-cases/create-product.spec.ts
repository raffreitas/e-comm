import { InMemoryProductRepository } from '@test/repositories/product/in-memory-product.repository'
import { CreateProductUseCase } from './create-product'
import { InMemoryTagRepository } from '@test/repositories/product/in-memory-tag.repository'
import { makeTag } from '@test/factories/make-tag'
import { ResourceNotFoundError } from '@/common/errors/errors'
import { InvalidQuantityError } from './errors'

let inMemoryProductRepository: InMemoryProductRepository
let inMemoryTagRepository: InMemoryTagRepository
let sut: CreateProductUseCase

describe('CreateProductUseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    inMemoryTagRepository = new InMemoryTagRepository()
    sut = new CreateProductUseCase(
      inMemoryProductRepository,
      inMemoryTagRepository,
    )
  })
  it('should be able to create a product successfully', async () => {
    // Arrange
    const tag1 = makeTag()
    const tag2 = makeTag()

    inMemoryTagRepository.items.push(tag1)
    inMemoryTagRepository.items.push(tag2)

    const createProductInput = {
      description: 'any_description',
      images: ['any_image'],
      name: 'any_name',
      price: 10,
      quantity: 10,
      tagIds: [tag1.id.toString(), tag2.id.toString()],
    }

    // Act
    const result = await sut.execute(createProductInput)

    // Assert
    expect(result.isRight()).toBe(true)
    expect(inMemoryProductRepository.items[0].description).toEqual(
      createProductInput.description,
    )
  })

  it('should not be able to create a product with invalid tag id', async () => {
    const createProductInput = {
      description: 'any_description',
      images: ['any_image'],
      name: 'any_name',
      price: 10,
      quantity: 10,
      tagIds: ['123', '123'],
    }

    const result = await sut.execute(createProductInput)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to create a product with quantity less than 0', async () => {
    const createProductInput = {
      description: 'any_description',
      images: ['any_image'],
      name: 'any_name',
      price: 10,
      quantity: -1,
      tagIds: [],
    }

    const result = await sut.execute(createProductInput)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidQuantityError)
  })
})
