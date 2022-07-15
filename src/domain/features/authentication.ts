import { AuthenticationError } from '@/domain/errors'
import { AccessToken } from '@/domain/models'

export interface Authentication {
  perform: (params: Authentication.Params) => Promise<Authentication.Result>
}

export namespace Authentication {
  export type Params = {
    email: string
    password: string
  }

  export type Result = AccessToken | AuthenticationError
}
