import { LoadUserAccount } from '@/data/contracts/repos'
import { MongoUserModel } from '@/infra/mongodb/entities'

export class MongoUserAccountRepository implements LoadUserAccount {
  async load (params: LoadUserAccount.Params): Promise<LoadUserAccount.Result> {
    const mongoUser = await MongoUserModel.findOne({ email: params.email })
    if (mongoUser !== null) {
      return {
        id: mongoUser.id
      }
    }
  }
}
