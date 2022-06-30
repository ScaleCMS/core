import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { RequiredFieldError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new RequiredFieldError(field))
      }
    }
  }
}
