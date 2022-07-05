import { MongoUserAccountRepository } from '@/infra/mongodb/repos'
import { MongoUserModel } from '@/infra/mongodb/models'
import { makeFakeDb } from '@/tests/infra/mongodb/mocks'

import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

describe('MongoUserAccountRepository', () => {
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

  describe('load', () => {
    it('should return an account if email exists', async () => {
      await MongoUserModel.create({ email: 'any_email' })

      const account = await sut.load({ email: 'any_email' })

      expect(account?.id).toBeDefined()
    })

    it('should return undefined if email does not exists', async () => {
      const account = await sut.load({ email: 'any_email' })

      expect(account).toBeUndefined()
    })
  })

  describe('save', () => {
    it('should create an account', async () => {
      const { id } = await sut.save({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      })
      const account = await MongoUserModel.findOne({ email: 'any_email' }).exec()

      expect(id).toEqual(account?.id)
    })
  })
})
