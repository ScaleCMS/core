import { SignUpController } from '@/presentation/controllers'
import { RequiredFieldError } from '@/presentation/errors'

describe('SignupController', () => {
  let sut: SignUpController

  beforeEach(() => {
    sut = new SignUpController()
  })

  it('should return 400 if name is not provided', () => {
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new RequiredFieldError('name')
    })
  })

  it('should return 400 if email is not provided', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new RequiredFieldError('email')
    })
  })

  it('should return 400 if password is not provided', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new RequiredFieldError('password')
    })
  })

  it('should return 400 if password confirmation is not provided', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new RequiredFieldError('passwordConfirmation')
    })
  })
})
