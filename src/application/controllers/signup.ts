import { Controller } from '@/application/controllers'
import { badRequest, HttpResponse, ok } from '@/application/helpers'
import { SaveAccount } from '@/domain/features'
import { EmailInUseError } from '@/domain/errors'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

type HttpRequest = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

type Model = Error | {
  id: string
}

export class SignUpController extends Controller {
  constructor (private readonly saveAccount: SaveAccount) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const user = await this.saveAccount.perform(httpRequest)
    if (!(user instanceof EmailInUseError)) {
      return ok({
        id: user.id
      })
    } else {
      return badRequest(user)
    }
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.name, fieldName: 'name' }).required().build(),
      ...Builder.of({ value: httpRequest.email, fieldName: 'email' }).required().email().build(),
      ...Builder.of({ value: httpRequest.password, fieldName: 'password' }).required().build(),
      ...Builder.of({ value: httpRequest.passwordConfirmation, fieldName: 'passwordConfirmation' })
        .required().equals(httpRequest.password).build()
    ]
  }
}
