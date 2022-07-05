import { MongoUserAccountRepository } from '@/infra/mongodb/repos'
import { MongoUserModel } from '@/infra/mongodb/models'
import { makeFakeDb } from '@/tests/infra/mongodb/mocks'

import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

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
