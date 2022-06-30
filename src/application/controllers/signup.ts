import { Controller } from '@/application/protocols'
import { EmailValidator, EqualsValidator, RequiredStringValidator, ValidationComposite } from '@/application/validation'
import { HttpResponse, badRequest } from '@/application/helpers'

export class SignUpController implements Controller {
  handle (httpRequest: any): HttpResponse | undefined {
    const error = this.validate(httpRequest)
    if (error) return badRequest(error)
  }

  private validate (httpRequest: any): Error | undefined {
    return new ValidationComposite([
      new RequiredStringValidator(httpRequest.name, 'name'),
      new RequiredStringValidator(httpRequest.email, 'email'),
      new RequiredStringValidator(httpRequest.password, 'password'),
      new RequiredStringValidator(httpRequest.passwordConfirmation, 'passwordConfirmation'),
      new EqualsValidator(httpRequest.passwordConfirmation, httpRequest.password, 'passwordConfirmation'),
      new EmailValidator(httpRequest.email)
    ]).validate()
  }
}
