import { SaveAccountService } from '@/data/services'
import { makeMongoUserAccountRepo } from '@/main/factories/repos'
import { makeBcryptHandler } from '@/main/factories/crypto'

export const makeSaveAccountService = (): SaveAccountService => {
  return new SaveAccountService(makeMongoUserAccountRepo(), makeBcryptHandler())
}
