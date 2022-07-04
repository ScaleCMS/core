import { SaveAccountService } from '@/data/services'
import { LoadUserAccount } from '@/data/contracts/repos'
import { EmailInUseError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('SaveAccountService', () => {
  it('should call LoadUserAccount with correct params', async () => {
    const userRepository = mock<LoadUserAccount>()
    const sut = new SaveAccountService(userRepository)

    await sut.perform({ name: 'any_name', email: 'any_email@mail.com', password: 'any_password' })

    expect(userRepository.load).toBeCalledWith({ email: 'any_email@mail.com' })
    expect(userRepository.load).toBeCalledTimes(1)
  })

  it('should return EmailInUseError when LoadUserAccount returns data', async () => {
    const userRepository = mock<LoadUserAccount>()
    userRepository.load.mockResolvedValue({ id: 'any_id' })
    const sut = new SaveAccountService(userRepository)

    const result = await sut.perform({ name: 'any_name', email: 'any_email@mail.com', password: 'any_password' })

    expect(result).toEqual(new EmailInUseError())
  })
})
