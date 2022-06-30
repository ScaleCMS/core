import { InvalidFieldError } from '@/application/errors'

class EqualsValidator {
  constructor (
    private readonly value: string,
    private readonly compareValue: string,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    return new InvalidFieldError(this.fieldName)
  }
}

describe('EqualsValidator', () => {
  it('should return InvalidFieldError if value is not equal', () => {
    const sut = new EqualsValidator('any_value', 'value', 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })
})
