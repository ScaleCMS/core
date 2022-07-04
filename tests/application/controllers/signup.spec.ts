import { Controller, SignUpController } from '@/application/controllers'
import { EmailValidator, EqualsValidator, RequiredStringValidator } from '@/application/validation'
import { EmailInUseError } from '@/domain/errors'
import { CreateAccount } from '@/domain/use-cases'
import { ServerError } from '@/application/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('SignupController', () => {
  let sut: SignUpController
  let createAccount: MockProxy<CreateAccount>
  let name: string
  let email: string
  let password: string
  let passwordConfirmation: string

  beforeAll(() => {
    createAccount = mock()
    createAccount.perform.mockResolvedValue({ id: 'any_id' })
    name = 'any_name'
    email = 'any_email@mail.com'
    password = 'any_password'
    passwordConfirmation = 'any_password'
  })

  beforeEach(() => {
    sut = new SignUpController(createAccount)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators({ name, email, password, passwordConfirmation })

    expect(validators).toEqual([
      new RequiredStringValidator(name, 'name'),
      new RequiredStringValidator(email, 'email'),
      new EmailValidator(email),
      new RequiredStringValidator(password, 'password'),
      new RequiredStringValidator(passwordConfirmation, 'passwordConfirmation'),
      new EqualsValidator(password, passwordConfirmation, 'passwordConfirmation')
    ])
  })

  it('should call CreateAccount with correct params', async () => {
    await sut.handle({ name, email, password, passwordConfirmation })

    expect(createAccount.perform).toBeCalledWith({ name, email, password, passwordConfirmation })
    expect(createAccount.perform).toBeCalledTimes(1)
  })

  it('should return 400 if email is already in use', async () => {
    createAccount.perform.mockResolvedValueOnce(new EmailInUseError())

    const httpResponse = await sut.handle({ name, email, password, passwordConfirmation })

    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new EmailInUseError()
    })
  })

  it('should return 500 on infra error', async () => {
    const error = new Error('infra_error')
    createAccount.perform.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ name, email, password, passwordConfirmation })

    expect(httpResponse).toEqual({
      statusCode: 500,
      body: new ServerError(error)
    })
  })

  it('should return 200 if account is created', async () => {
    const httpResponse = await sut.handle({ name, email, password, passwordConfirmation })

    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        id: 'any_id'
      }
    })
  })
})
