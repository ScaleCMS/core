export interface Hasher {
  hash: (params: Hasher.Params) => Promise<void>
}

export namespace Hasher {
  export type Params = { key: string }
}
