import { Either, left, right } from '@/common/either'
import { Product } from '../../enterprise/product.entity'
import { ProductRepository } from '../repositories/product.repository'
import { TagRepository } from '../repositories/tag.repository'
import { ResourceNotFoundError } from '@/common/errors/errors'
import { InvalidQuantityError } from './errors'

export interface CreateProductInput {
  name: string
  price: number
  quantity: number
  description: string
  tagIds: string[]
  images: string[]
}

type CreateProductOutput = Either<
  ResourceNotFoundError | InvalidQuantityError,
  {
    product: Product
  }
>

export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async execute(input: CreateProductInput): Promise<CreateProductOutput> {
    const { description, images, name, price, quantity, tagIds } = input

    if (quantity < 0) {
      return left(new InvalidQuantityError(quantity))
    }

    try {
      const tags = await Promise.all(
        tagIds.map(async (id) => {
          const tag = await this.tagRepository.findById(id)
          if (!tag) {
            throw new ResourceNotFoundError()
          }
          return tag
        }),
      )

      const product = Product.create({
        description,
        name,
        price,
        quantity,
        tags,
        images,
      })

      await this.productRepository.create(product)

      return right({ product })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return left(error)
      }
      throw error
    }
  }
}
