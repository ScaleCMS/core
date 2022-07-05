import { LoadUserAccount, SaveUserAccount } from '@/data/contracts/repos'
import { MongoUserModel } from '@/infra/mongodb/models'

export class MongoUserAccountRepository implements LoadUserAccount, SaveUserAccount {
  async load (params: LoadUserAccount.Params): Promise<LoadUserAccount.Result> {
    const mongoUser = await MongoUserModel.findOne({ email: params.email })
    if (mongoUser !== null) {
      return {
        id: mongoUser.id
      }
    }
  }

  async save (params: SaveUserAccount.Params): Promise<SaveUserAccount.Result> {
    const mongoUser = await MongoUserModel.create({
      email: params.email,
      password: params.password,
      profile: {
        name: params.name
      }
    })
    return {
      id: mongoUser.id
    }
  }
}
