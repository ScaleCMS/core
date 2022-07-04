import { EmailInUseError } from '@/domain/errors'

export interface SaveAccount {
  perform: (params: SaveAccount.Params) => Promise<SaveAccount.Result>
}

export namespace SaveAccount {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = { id: string } | EmailInUseError
}
