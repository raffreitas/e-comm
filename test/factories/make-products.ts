import { UniqueEntityID } from '@/common/entities/unique-entity-id'
import { ProductTags } from '@/domain/product/enterprise/product-tags.entity'
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
      tags: [ProductTags.create({ name: faker.commerce.productAdjective() })],
      images: [faker.internet.url(), faker.internet.url()],
      ...override,
    },
    id,
  )

  return product
}
