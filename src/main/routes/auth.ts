import { adaptExpressRoute as adapt } from '@/infra/http'
import { makeSignUpController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/auth/signup', adapt(makeSignUpController()))
}
