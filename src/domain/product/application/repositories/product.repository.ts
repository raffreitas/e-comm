import { Product } from '../../enterprise/product.entity'

export interface ProductRepository {
  create(product: Product): Promise<void>
  findById(id: string): Promise<Product | null>
}
