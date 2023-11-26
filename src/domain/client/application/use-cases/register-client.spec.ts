import { InMemoryClientRepository } from '@test/repositories/client/in-memory-client.repository'
import { FakeHashGenerator } from '@test/cryptograph/fake-hash-generator'
import { RegisterClientUseCase } from './register-client'
import { ClientAlreadyExistsError } from './errors/client-already-exists.error'
import { InvalidCPFError } from './errors'

let sut: RegisterClientUseCase
let inMemoryClientRepository: InMemoryClientRepository
let fakeHashGenerator: FakeHashGenerator

describe('Register Client UseCase', () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository()
    fakeHashGenerator = new FakeHashGenerator()
    sut = new RegisterClientUseCase(inMemoryClientRepository, fakeHashGenerator)
  })
  it('should be able to register an client successfully', async () => {
    const clientProps = {
      document: '529.982.247-25',
      email: 'test@test.com',
      name: 'test',
      password: '123',
    }

    const result = await sut.execute(clientProps)

    expect(result.isRight()).toBe(true)

    expect(inMemoryClientRepository.items.length).toBe(1)
    expect(inMemoryClientRepository.items[0].email).toBe(clientProps.email)
  })

  it('should not be able to register an client with same email', async () => {
    const clientProps = {
      document: '529.982.247-25',
      email: 'test@test.com',
      name: 'test',
      password: '123',
    }

    await sut.execute(clientProps)

    const result = await sut.execute(clientProps)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ClientAlreadyExistsError)
  })

  it('should not be able to register an client with invalid CPF', async () => {
    const clientProps = {
      document: '11111111111',
      email: 'test@test.com',
      name: 'test',
      password: '123',
    }

    await sut.execute(clientProps)

    const result = await sut.execute(clientProps)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidCPFError)
  })
})
