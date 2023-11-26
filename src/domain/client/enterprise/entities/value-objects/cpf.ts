export class CPF {
  private value: string

  private constructor(value: string) {
    const regex = /[.|\-/|\\/]/g
    const cpf = value.replace(regex, '')
    this.validate(cpf)
    this.value = cpf
  }

  static create(value: string) {
    const cpf = new CPF(value)
    return cpf
  }

  format() {
    return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  toString() {
    return this.value
  }

  // Validation

  private validate(value: string) {
    this.validateLength(value)
    this.validateDigits(value)
    this.validateFirstDigit(value)
    this.validateSecondDigit(value)
  }

  private validateLength(value: string) {
    if (value.length !== 11) {
      throw new Error('Invalid CPF')
    }
  }

  private validateDigits(value: string) {
    const digits = value.split('')
    const allEqual = digits.every((digit) => digit === digits[0])
    if (allEqual) {
      throw new Error('Invalid CPF')
    }
  }

  private validateFirstDigit(value: string) {
    const firstDigit = value.charAt(9)
    const sum = value
      .substring(0, 9)
      .split('')
      .reduce((acc, curr, index) => {
        return acc + parseInt(curr) * (10 - index)
      }, 0)

    let rest = (sum * 10) % 11

    if (rest === 10) {
      rest = 0
    }

    if (rest !== parseInt(firstDigit)) {
      throw new Error('Invalid CPF')
    }
  }

  private validateSecondDigit(value: string) {
    const secondDigit = value.charAt(10)
    const sum = value
      .substring(0, 10)
      .split('')
      .reduce((acc, curr, index) => {
        return acc + parseInt(curr) * (11 - index)
      }, 0)

    let rest = (sum * 10) % 11

    if (rest === 10) {
      rest = 0
    }

    if (rest !== parseInt(secondDigit)) {
      throw new Error('Invalid CPF')
    }
  }
}
