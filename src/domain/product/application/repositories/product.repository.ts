import { Product } from '../../enterprise/product.entity'

export interface ProductRepository {
  findById(id: string): Promise<Product | null>
}
