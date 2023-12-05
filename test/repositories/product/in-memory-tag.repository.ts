import { TagRepository } from '@/domain/product/application/repositories/tag.repository'
import { ProductTag } from '@/domain/product/enterprise/product-tag.entity'

export class InMemoryTagRepository implements TagRepository {
  items: ProductTag[] = []

  async create(tag: ProductTag): Promise<void> {
    this.items.push(tag)
  }

  async findById(id: string): Promise<ProductTag | null> {
    const tag = this.items.find((item) => item.id.toString() === id)

    if (!tag) {
      return null
    }

    return tag
  }
}
