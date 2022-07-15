import { app } from '@/main/config/app'
import { MongoUserModel } from '@/infra/mongodb/models'
import { EmailInUseError } from '@/domain/errors'

import request from 'supertest'
import mongoose from 'mongoose'

describe('Auth Routes', () => {
  describe('POST /signup', () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.DB_TEST_URL ?? '')
    })

    afterAll(async () => {
      await mongoose.disconnect()
    })

    beforeEach(async () => {
      await mongoose.connection.dropDatabase()
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('should return 200 with user id', async () => {
      const { status, body } = await request(app)
        .post('/api/auth/signup')
        .send({
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        })

      expect(status).toBe(200)
      expect(body.id).toBeDefined()
    })

    it('should return 400 with EmailInUseError', async () => {
      jest
        .spyOn(MongoUserModel, 'findOne')
        .mockReturnValueOnce({ _id: 'any_id' } as any)

      const { status, body } = await request(app)
        .post('/api/auth/signup')
        .send({
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        })

      expect(status).toBe(400)
      expect(body.error).toBe(new EmailInUseError().message)
    })
  })
})
