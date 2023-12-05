import { ProductTag } from '../../enterprise/product-tag.entity'

export interface TagRepository {
  create(tag: ProductTag): Promise<void>
  findById(id: string): Promise<ProductTag | null>
}
