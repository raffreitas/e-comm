import { Entity } from '@/common/entities/entity'
import { UniqueEntityID } from '@/common/entities/unique-entity-id'

export interface ProductTagsProps {
  name: string
}

export class ProductTags extends Entity<ProductTagsProps> {
  static create(props: ProductTagsProps, id?: UniqueEntityID) {
    const product = new ProductTags(props, id)

    return product
  }

  get name() {
    return this.props.name
  }
}
