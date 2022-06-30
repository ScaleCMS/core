import { HttpRequest, HttpResponse } from '@/presentation/protocols'
import { RequiredFieldError } from '@/presentation/errors'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new RequiredFieldError('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new RequiredFieldError('email')
      }
    }
  }
}
