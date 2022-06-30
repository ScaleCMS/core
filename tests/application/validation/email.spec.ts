export class InvalidFieldError extends Error {
  constructor (fieldName: string) {
    super(`The field ${fieldName} is invalid`)
    this.name = 'InvalidFieldError'
  }
}

class EmailValidator {
  constructor (
    private readonly value: string
  ) {}

  validate (): Error | undefined {
    return new InvalidFieldError('email')
  }
}

describe('EmailValidator', () => {
  it('should return InvalidFieldError if email is invalid', () => {
    const sut = new EmailValidator('invalid_email.com')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('email'))
  })
})
