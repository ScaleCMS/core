import { SignUpController } from '@/application/controllers'
import { InvalidFieldError, RequiredFieldError } from '@/application/errors'
import { CreateAccount } from '@/domain/use-cases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('SignupController', () => {
  let sut: SignUpController
  let createAccount: MockProxy<CreateAccount>

  beforeAll(() => {
    createAccount = mock()
  })

  beforeEach(() => {
    sut = new SignUpController(createAccount)
  })

  it('should return 400 if name is not provided', async () => {
    const httpRequest = {
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new RequiredFieldError('name')
    })
  })

  it('should return 400 if email is not provided', async () => {
    const httpRequest = {
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new RequiredFieldError('email')
    })
  })

  it('should return 400 if password is not provided', async () => {
    const httpRequest = {
      name: 'any_name',
      email: 'any_email@mail.com',
      passwordConfirmation: 'any_password'
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new RequiredFieldError('password')
    })
  })

  it('should return 400 if password confirmation is not provided', async () => {
    const httpRequest = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new RequiredFieldError('passwordConfirmation')
    })
  })

  it('should return 400 if password confirmation fails', async () => {
    const httpRequest = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'invalid_password'
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new InvalidFieldError('passwordConfirmation')
    })
  })

  it('should return 400 if an invalid email is provided', async () => {
    const httpRequest = {
      name: 'any_name',
      email: 'invalid_email.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new InvalidFieldError('email')
    })
  })

  it('should call CreateAccount with correct params', async () => {
    const httpRequest = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }

    await sut.handle(httpRequest)

    expect(createAccount.perform).toBeCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    })
  })
})
