import { LoadUserAccount, SaveUserAccount } from '@/data/contracts/repos'
import { Hasher } from '@/data/contracts/crypto'
import { EmailInUseError } from '@/domain/errors'
import { SaveAccount } from '@/domain/features'

export class SaveAccountService implements SaveAccount {
  constructor (
    private readonly userRepository: LoadUserAccount & SaveUserAccount,
    private readonly crypto: Hasher
  ) {}

  async perform ({ name, email, password }: SaveAccount.Params): Promise<SaveAccount.Result> {
    const user = await this.userRepository.load({ email })
    if (user !== undefined) {
      return new EmailInUseError()
    }
    const hashedPassword = await this.crypto.hash({ key: password })
    return await this.userRepository.save({
      name,
      email,
      password: hashedPassword
    })
  }
}
