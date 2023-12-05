import { Entity } from '@/common/entities/entity'
import { ProductTag } from './product-tag.entity'
import { UniqueEntityID } from '@/common/entities/unique-entity-id'

export interface ProductProps {
  name: string
  price: number
  quantity: number
  description: string
  tags: ProductTag[]
  images?: string[]
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name
  }

  get price() {
    return this.props.price
  }

  get quantity() {
    return this.props.quantity
  }

  get description() {
    return this.props.description
  }

  get tags() {
    return this.props.tags
  }

  static create(props: ProductProps, id?: UniqueEntityID) {
    const product = new Product(props, id)
    return product
  }
}
