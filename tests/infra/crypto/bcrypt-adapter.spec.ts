import { Hasher } from '@/data/contracts/crypto'

import bcrypt from 'bcryptjs'

jest.mock('bcryptjs')

class BcryptHandler implements Hasher {
  constructor (private readonly salt: number) {}

  async hash ({ plaintext }: Hasher.Params): Promise<Hasher.Result> {
    return await bcrypt.hash(plaintext, this.salt)
  }
}

describe('BcryptHandler', () => {
  let sut: BcryptHandler
  let fakeBcrypt: jest.Mocked<typeof bcrypt>

  beforeAll(() => {
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
    fakeBcrypt.hash.mockImplementation(() => 'any_value')
  })

  beforeEach(() => {
    sut = new BcryptHandler(12)
  })

  it('should call hash with correct params', async () => {
    await sut.hash({ plaintext: 'any_plaintext' })

    expect(fakeBcrypt.hash).toHaveBeenCalledWith('any_plaintext', 12)
  })

  it('should return a generated hash', async () => {
    const hash = await sut.hash({ plaintext: 'any_plaintext' })

    expect(hash).toBe('any_value')
  })
})
