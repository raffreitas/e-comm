import { ProductRepository } from '@/domain/product/application/repositories/product.repository'
import { Product } from '@/domain/product/enterprise/product.entity'

export class InMemoryProductRepository implements ProductRepository {
  items: Product[] = []

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id.toString() === id)

    if (!product) {
      return null
    }

    return product
  }

  async create(product: Product): Promise<void> {
    this.items.push(product)
  }
}
