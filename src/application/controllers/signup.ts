import { Controller, HttpRequest, HttpResponse } from '@/application/protocols'
import { RequiredStringValidator, ValidationComposite } from '@/application/validation'
import { badRequest } from '@/application/helpers'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    const error = this.validate(httpRequest)
    if (error) return badRequest(error)
  }

  private validate (httpRequest: HttpRequest): Error | undefined {
    return new ValidationComposite([
      new RequiredStringValidator(httpRequest.body.name, 'name'),
      new RequiredStringValidator(httpRequest.body.email, 'email'),
      new RequiredStringValidator(httpRequest.body.password, 'password'),
      new RequiredStringValidator(httpRequest.body.passwordConfirmation, 'passwordConfirmation')
    ]).validate()
  }
}
