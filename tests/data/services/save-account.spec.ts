import { LoadUserAccount } from '@/data/contracts/repos'
import { EmailInUseError } from '@/domain/errors'
import { SaveAccount } from '@/domain/features'

class SaveAccountService {
  constructor (
    private readonly userRepository: LoadUserAccount
  ) {}

  async perform ({ email }: SaveAccount.Params): Promise<EmailInUseError> {
    await this.userRepository.load({ email })
    return new EmailInUseError()
  }
}

describe('SaveAccountService', () => {
  it('should call LoadUserAccount with correct params', async () => {
    const userRepository = {
      load: jest.fn()
    }
    const sut = new SaveAccountService(userRepository)

    await sut.perform({ name: 'any_name', email: 'any_email@mail.com', password: 'any_password' })

    expect(userRepository.load).toBeCalledWith({ email: 'any_email@mail.com' })
    expect(userRepository.load).toBeCalledTimes(1)
  })

  it('should return EmailInUseError when LoadUserAccount returns data', async () => {
    const userRepository = {
      load: jest.fn()
    }
    userRepository.load.mockResolvedValue({ id: 'any_id' })
    const sut = new SaveAccountService(userRepository)

    const result = await sut.perform({ name: 'any_name', email: 'any_email@mail.com', password: 'any_password' })

    expect(result).toEqual(new EmailInUseError())
  })
})
