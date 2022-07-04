import { SaveAccountService } from '@/data/services'
import { LoadUserAccount, SaveUserAccount } from '@/data/contracts/repos'
import { Hasher } from '@/data/contracts/crypto'
import { EmailInUseError } from '@/domain/errors'

import { MockProxy, mock } from 'jest-mock-extended'

describe('SaveAccountService', () => {
  let userRepository: MockProxy<LoadUserAccount & SaveUserAccount>
  let crypto: MockProxy<Hasher>
  let sut: SaveAccountService
  let name: string
  let email: string
  let password: string

  beforeAll(() => {
    name = 'any_name'
    email = 'any_email@mail.com'
    password = 'any_password'
  })

  beforeEach(() => {
    userRepository = mock()
    userRepository.load.mockResolvedValue(undefined)
    crypto = mock()
    sut = new SaveAccountService(userRepository, crypto)
  })

  it('should call LoadUserAccount with correct params', async () => {
    await sut.perform({ name, email, password })

    expect(userRepository.load).toBeCalledWith({ email })
    expect(userRepository.load).toBeCalledTimes(1)
  })

  it('should return EmailInUseError when LoadUserAccount returns data', async () => {
    userRepository.load.mockResolvedValueOnce({ id: 'any_id' })

    const result = await sut.perform({ name, email, password })

    expect(result).toEqual(new EmailInUseError())
  })

  it('should call Hasher with correct params', async () => {
    await sut.perform({ name, email, password })

    expect(crypto.hash).toBeCalledWith({ key: 'any_password' })
    expect(crypto.hash).toBeCalledTimes(1)
  })

  it('should call SaveUserAccount with correct params', async () => {
    crypto.hash.mockResolvedValue('hashed_password')

    await sut.perform({ name, email, password })

    expect(userRepository.save).toBeCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
    expect(userRepository.save).toBeCalledTimes(1)
  })

  it('should return saved user id on success', async () => {
    userRepository.save.mockResolvedValueOnce({ id: 'any_id' })

    const result = await sut.perform({ name, email, password })

    expect(result).toEqual({
      id: 'any_id'
    })
  })

  it('should rethrow if LoadUserAccount throws', async () => {
    userRepository.load.mockRejectedValue(new Error('load_error'))

    const promise = sut.perform({ name, email, password })

    await expect(promise).rejects.toThrow(new Error('load_error'))
  })

  it('should rethrow if SaveUserAccount throws', async () => {
    userRepository.save.mockRejectedValue(new Error('save_error'))

    const promise = sut.perform({ name, email, password })

    await expect(promise).rejects.toThrow(new Error('save_error'))
  })

  it('should rethrow if Hasher throws', async () => {
    crypto.hash.mockRejectedValue(new Error('hash_error'))

    const promise = sut.perform({ name, email, password })

    await expect(promise).rejects.toThrow(new Error('hash_error'))
  })
})
