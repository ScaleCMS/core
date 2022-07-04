import { LoadUserAccount, SaveUserAccount } from '@/data/contracts/repos'
import { EmailInUseError } from '@/domain/errors'
import { SaveAccount } from '@/domain/features'

export class SaveAccountService {
  constructor (
    private readonly userRepository: LoadUserAccount & SaveUserAccount
  ) {}

  async perform (params: SaveAccount.Params): Promise<EmailInUseError | void> {
    const user = await this.userRepository.load({ email: params.email })
    if (user !== undefined) {
      return new EmailInUseError()
    }
    await this.userRepository.save(params)
  }
}
