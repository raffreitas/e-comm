import { InMemoryTagRepository } from '@test/repositories/product/in-memory-tag.repository'
import { CreateTagUseCase } from './create-tag'

let sut: CreateTagUseCase
let inMemoryTagRepository: InMemoryTagRepository

describe('Create tag use case', () => {
  beforeEach(() => {
    inMemoryTagRepository = new InMemoryTagRepository()
    sut = new CreateTagUseCase(inMemoryTagRepository)
  })

  it('should be able to create a tag successfully', async () => {
    const tagInput = {
      name: 'any_name',
    }

    const result = await sut.execute(tagInput)

    expect(result.isRight()).toBe(true)

    expect(inMemoryTagRepository.items[0].name).toEqual(tagInput.name)
  })
})
