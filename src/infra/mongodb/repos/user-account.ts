import { LoadUserAccount, SaveUserAccount } from '@/data/contracts/repos'
import { MongoUserModel } from '@/infra/mongodb/models'

export class MongoUserAccountRepository implements LoadUserAccount, SaveUserAccount {
  async load ({ email }: LoadUserAccount.Params): Promise<LoadUserAccount.Result> {
    const mongoUser = await MongoUserModel.findOne({ email })
    if (mongoUser !== null) {
      return {
        id: mongoUser.id
      }
    }
  }

  async save ({ email, password, name }: SaveUserAccount.Params): Promise<SaveUserAccount.Result> {
    const mongoUser = await MongoUserModel.create({
      email,
      password,
      profile: {
        name
      }
    })
    return {
      id: mongoUser.id
    }
  }
}
