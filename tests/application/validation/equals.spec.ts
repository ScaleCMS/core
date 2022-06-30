import { InvalidFieldError } from '@/application/errors'

import validator from 'validator'

class EqualsValidator {
  constructor (
    private readonly value: string,
    private readonly compareValue: string,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    if (!validator.equals(this.value, this.compareValue)) {
      return new InvalidFieldError(this.fieldName)
    }
  }
}

describe('EqualsValidator', () => {
  it('should return InvalidFieldError if value is not equal', () => {
    const sut = new EqualsValidator('valid_value', 'invalid_value', 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  it('should return undefined if value is equal', () => {
    const sut = new EqualsValidator('any_value', 'any_value', 'any_field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
