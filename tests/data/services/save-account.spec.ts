import { SaveAccountService } from '@/data/services'
import { LoadUserAccount, SaveUserAccount } from '@/data/contracts/repos'
import { EmailInUseError } from '@/domain/errors'

import { MockProxy, mock } from 'jest-mock-extended'

describe('SaveAccountService', () => {
  let userRepository: MockProxy<LoadUserAccount & SaveUserAccount>
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
    sut = new SaveAccountService(userRepository)
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

  it('should call SaveUserAccount when LoadUserAccount returns undefined', async () => {
    userRepository.load.mockResolvedValueOnce(undefined)

    await sut.perform({ name, email, password })

    expect(userRepository.save).toBeCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(userRepository.save).toBeCalledTimes(1)
  })
})
