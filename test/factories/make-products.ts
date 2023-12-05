import { UniqueEntityID } from '@/common/entities/unique-entity-id'
import { ProductTag } from '@/domain/product/enterprise/product-tag.entity'
import {
  Product,
  ProductProps,
} from '@/domain/product/enterprise/product.entity'
import { faker } from '@faker-js/faker'

export function makeProduct(
  override: Partial<ProductProps>,
  id?: UniqueEntityID,
) {
  const product = Product.create(
    {
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      quantity: faker.number.int({ min: 1, max: 10 }),
      tags: [ProductTag.create({ name: faker.commerce.productAdjective() })],
      images: [faker.internet.url(), faker.internet.url()],
      ...override,
    },
    id,
  )

  return product
}
