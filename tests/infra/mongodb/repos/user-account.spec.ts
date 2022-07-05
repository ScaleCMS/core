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
  describe('load', () => {
    let sut: MongoUserAccountRepository

    beforeAll(async () => {
      await mongoose.connect('mongodb+srv://root:CQEZQWC7PH1Zpr33@cluster0.d99ds.mongodb.net/?retryWrites=true&w=majority', {
        dbName: 'scalecms-test'
      })
    })

    afterAll(async () => {
      await mongoose.disconnect()
    })

    beforeEach(async () => {
      sut = new MongoUserAccountRepository()
      await mongoose.connection.dropDatabase()
    })

    it('should return an account if email exists', async () => {
      await MongoUserModel.create({ email: 'any_email' })

      const account = await sut.load({ email: 'any_email' })

      expect(account).toEqual({ id: account?.id })
    })

    it('should return undefined if email does not exists', async () => {
      const account = await sut.load({ email: 'any_email' })

      expect(account).toBeUndefined()
    })
  })
})
