import { HashGenerator } from '@/domain/client/application/cryptography'

export class FakeHashGenerator implements HashGenerator {
  async hash(value: string) {
    return value.concat('-hashed')
  }
}
