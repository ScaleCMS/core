import { LoadUserAccount } from '@/data/contracts/repos'

import mongoose, { Schema } from 'mongoose'

class MongoUserAccountRepository implements LoadUserAccount {
  async load (params: LoadUserAccount.Params): Promise<LoadUserAccount.Result> {
    const mongoUser = await MongoUserModel.findOne({ email: params.email })
    if (mongoUser !== null) {
      return {
        id: mongoUser.id
      }
    }
  }
}

const MongoUserModel = mongoose.model('User', new Schema({
  email: String,
  password: String,
  profile: {
    name: String
  }
}, { timestamps: true }))

describe('MongoUserAccountRepository', () => {
  afterAll(async () => {
    await mongoose.disconnect()
  })

  describe('load', () => {
    it('should return an account if email exists', async () => {
      await mongoose.connect('mongodb+srv://root:CQEZQWC7PH1Zpr33@cluster0.d99ds.mongodb.net/?retryWrites=true&w=majority', {
        dbName: 'scalecms-test'
      })
      await mongoose.connection.dropDatabase()
      await MongoUserModel.create({ email: 'existing_email' })
      const sut = new MongoUserAccountRepository()

      const account = await sut.load({ email: 'existing_email' })

      expect(account).toEqual({ id: account?.id })
    })
  })
})
