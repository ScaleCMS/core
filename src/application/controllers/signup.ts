import { Controller, HttpRequest, HttpResponse } from '@/application/protocols'
import { RequiredFieldError } from '@/application/errors'
import { badRequest } from '@/application/helpers'

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
