import { HashComparer } from '@/domain/client/application/cryptography'

export class FakeHashComparer implements HashComparer {
  async compare(value: string, hash: string): Promise<boolean> {
    return value === hash.concat('-hashed')
  }
}
