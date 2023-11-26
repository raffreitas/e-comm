import {
  HashComparer,
  HashGenerator,
} from '@/domain/client/application/cryptography'
import { compare, hash } from 'bcrypt'

export class BcryptHasher implements HashComparer, HashGenerator {
  async compare(value: string, hash: string) {
    return await compare(value, hash)
  }

  async hash(value: string): Promise<string> {
    return await hash(value, 12)
  }
}
