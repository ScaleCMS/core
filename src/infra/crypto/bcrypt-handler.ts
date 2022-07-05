import { Hasher } from '@/data/contracts/crypto'

import bcrypt from 'bcryptjs'

export class BcryptHandler implements Hasher {
  constructor (private readonly salt: number) {}

  async hash ({ plaintext }: Hasher.Params): Promise<Hasher.Result> {
    return await bcrypt.hash(plaintext, this.salt)
  }
}
