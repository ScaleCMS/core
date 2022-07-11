import { MongoUserAccountRepository } from '@/infra/mongodb/repos'

export const makeMongoUserAccountRepo = (): MongoUserAccountRepository => {
  return new MongoUserAccountRepository()
}
