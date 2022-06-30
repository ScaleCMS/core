import { Controller } from '@/application/protocols'
import { ValidationBuilder as Builder, ValidationComposite } from '@/application/validation'
import { HttpResponse, badRequest } from '@/application/helpers'

export class SignUpController implements Controller {
  handle (httpRequest: any): HttpResponse | undefined {
    const error = this.validate(httpRequest)
    if (error) return badRequest(error)
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
