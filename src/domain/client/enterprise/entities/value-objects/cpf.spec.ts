import { CPF } from './cpf'

describe('CPF', () => {
  it('should be a valid CPF', () => {
    const cpf = CPF.create('52998224725')
    expect(cpf.toString()).toBe('52998224725')
  })

  it('should be a valid CPF with mask', () => {
    const cpf = CPF.create('529.982.247-25')
    expect(cpf.toString()).toBe('52998224725')
  })

  it('should be able to format a CPF', () => {
    const cpf = CPF.create('52998224725')
    const formattedCpf = cpf.format()
    expect(formattedCpf).toBe('529.982.247-25')
  })

  it('should not be able to create a CPF with invalid value', () => {
    expect(() => CPF.create('12345678910')).toThrowError('Invalid CPF')
  })

  it('should not be able to create a CPF with invalid length', () => {
    expect(() => CPF.create('123456789')).toThrowError('Invalid CPF')
  })

  it('should not be able to create a CPF with a sequence digits', () => {
    expect(() => CPF.create('11111111111')).toThrowError('Invalid CPF')
  })
})
