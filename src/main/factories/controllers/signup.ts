import { SignUpController } from '@/application/controllers'

import { makeSaveAccountService } from '@/main/factories/services'

export const makeSignUpController = (): SignUpController => {
  return new SignUpController(makeSaveAccountService())
}
