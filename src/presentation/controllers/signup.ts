import { HttpRequest, HttpResponse } from '@/presentation/protocols'
import { RequiredFieldError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    if (!httpRequest.body.name) {
      return badRequest(new RequiredFieldError('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new RequiredFieldError('email'))
    }
  }
}
