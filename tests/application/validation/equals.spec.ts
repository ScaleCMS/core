import { EqualsValidator } from '@/application/validation'
import { InvalidFieldError } from '@/application/errors'

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
