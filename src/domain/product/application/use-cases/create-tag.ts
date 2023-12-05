import { Either, right } from '@/common/either'
import { ProductTag } from '../../enterprise/product-tag.entity'
import { TagRepository } from '../repositories/tag.repository'

export interface CreateTagInput {
  name: string
}

type CreateTagOutput = Either<null, { tag: ProductTag }>

export class CreateTagUseCase {
  constructor(private readonly tagRepository: TagRepository) {}

  async execute({ name }: CreateTagInput): Promise<CreateTagOutput> {
    const tag = ProductTag.create({ name })
    await this.tagRepository.create(tag)
    return right({ tag })
  }
}
