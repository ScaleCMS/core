export interface LoadUserAccount {
  load: (params: LoadUserAccount.Params) => Promise<LoadUserAccount.Result>
}

export namespace LoadUserAccount {
  export type Params = { email: string }

  export type Result = undefined | {
    id: string
  }
}

export interface SaveUserAccount {
  save: (params: SaveUserAccount.Params) => Promise<SaveUserAccount.Result>
}

export namespace SaveUserAccount {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = { id: string }
}
