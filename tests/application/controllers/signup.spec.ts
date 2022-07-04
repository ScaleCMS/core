import { SignUpController } from '@/application/controllers'
import { EmailValidator, EqualsValidator, RequiredStringValidator } from '@/application/validation'
import { CreateAccount } from '@/domain/use-cases'

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
    name = 'any_name'
    email = 'any_email@mail.com'
    password = 'any_password'
    passwordConfirmation = 'any_password'
  })

  beforeEach(() => {
    sut = new SignUpController(createAccount)
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
})
