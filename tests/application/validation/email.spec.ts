import { EmailValidator } from '@/application/validation'
import { InvalidFieldError } from '@/application/errors'

describe('EmailValidator', () => {
  it('should return InvalidFieldError if email is invalid', () => {
    const sut = new EmailValidator('invalid_email.com')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('email'))
  })

  it('should return undefined if email is valid', () => {
    const sut = new EmailValidator('valid@mail.com')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
