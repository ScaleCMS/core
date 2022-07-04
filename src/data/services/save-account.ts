import { LoadUserAccount, SaveUserAccount } from '@/data/contracts/repos'
import { Hasher } from '@/data/contracts/crypto'
import { EmailInUseError } from '@/domain/errors'
import { SaveAccount } from '@/domain/features'

export class SaveAccountService {
  constructor (
    private readonly userRepository: LoadUserAccount & SaveUserAccount,
    private readonly crypto: Hasher
  ) {}

  async perform (params: SaveAccount.Params): Promise<EmailInUseError | void> {
    const user = await this.userRepository.load({ email: params.email })
    if (user !== undefined) {
      return new EmailInUseError()
    }
    await this.crypto.hash({ key: params.password })
    await this.userRepository.save(params)
  }
}
