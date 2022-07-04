import { EmailInUseError } from '@/domain/errors'

export interface CreateAccount {
  perform: (params: CreateAccount.Params) => Promise<CreateAccount.Result>
}

namespace CreateAccount {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = { id: string } | EmailInUseError
}
