import { Controller } from '@/application/protocols'
import { ValidationBuilder as Builder, ValidationComposite } from '@/application/validation'
import { HttpResponse, badRequest, ok } from '@/application/helpers'
import { CreateAccount } from '@/domain/use-cases'

export class SignUpController implements Controller {
  constructor (private readonly createAccount: CreateAccount) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    const error = this.validate(httpRequest)
    if (error) return badRequest(error)
    const userId = await this.createAccount.perform(httpRequest)
    return ok(userId)
  }

  private validate (httpRequest: any): Error | undefined {
    return new ValidationComposite([
      ...Builder.of({ value: httpRequest.name, fieldName: 'name' }).required().build(),
      ...Builder.of({ value: httpRequest.email, fieldName: 'email' }).required().email().build(),
      ...Builder.of({ value: httpRequest.password, fieldName: 'password' }).required().build(),
      ...Builder.of({ value: httpRequest.passwordConfirmation, fieldName: 'passwordConfirmation' })
        .required().equals(httpRequest.password).build()
    ]).validate()
  }
}
