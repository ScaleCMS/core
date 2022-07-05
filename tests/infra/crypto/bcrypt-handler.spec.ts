import { BcryptHandler } from '@/infra/crypto'

import bcrypt from 'bcryptjs'

jest.mock('bcryptjs')

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

  it('should return a hash', async () => {
    const hash = await sut.hash({ plaintext: 'any_plaintext' })

    expect(hash).toBe('any_value')
  })

  it('should rethrow if hash throws', async () => {
    const error = new Error('bcrypt_error')
    fakeBcrypt.hash.mockImplementationOnce(() => { throw error })

    const promise = sut.hash({ plaintext: 'any_plaintext' })

    await expect(promise).rejects.toThrow(error)
  })
})
