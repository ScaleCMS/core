import { LoadUserAccount } from '@/data/contracts/repos'

import mongoose, { Schema } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

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

const makeFakeDb = async (): Promise<MongoMemoryServer> => {
  const server = await MongoMemoryServer.create()
  await mongoose.connect(server.getUri(), {
    dbName: 'scalecms-test'
  })
  return server
}

describe('MongoUserAccountRepository', () => {
  describe('load', () => {
    let sut: MongoUserAccountRepository
    let server: MongoMemoryServer

    beforeAll(async () => {
      server = await makeFakeDb()
    })

    afterAll(async () => {
      await server.stop()
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
