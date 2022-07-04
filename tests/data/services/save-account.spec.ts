import { LoadUserAccount } from '@/data/contracts/repos'
import { SaveAccount } from '@/domain/features'

class SaveAccountService {
  constructor (
    private readonly userRepository: LoadUserAccount
  ) {}

  async perform ({ email }: SaveAccount.Params): Promise<void> {
    await this.userRepository.load({ email })
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
})
