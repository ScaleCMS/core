import { LoadUserAccount } from '@/data/contracts/repos'
import { EmailInUseError } from '@/domain/errors'
import { SaveAccount } from '@/domain/features'

export class SaveAccountService {
  constructor (
    private readonly userRepository: LoadUserAccount
  ) {}

  async perform ({ email }: SaveAccount.Params): Promise<EmailInUseError> {
    await this.userRepository.load({ email })
    return new EmailInUseError()
  }
}
