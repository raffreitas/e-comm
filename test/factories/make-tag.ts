import { UniqueEntityID } from '@/common/entities/unique-entity-id'
import { ProductTag } from '@/domain/product/enterprise/product-tag.entity'
import { faker } from '@faker-js/faker'

export function makeTag(override?: Partial<ProductTag>, id?: UniqueEntityID) {
  const tag = ProductTag.create(
    {
      name: faker.commerce.productAdjective(),
      ...override,
    },
    id,
  )

  return tag
}
