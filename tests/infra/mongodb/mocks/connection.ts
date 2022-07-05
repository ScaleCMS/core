import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

export const makeFakeDb = async (): Promise<MongoMemoryServer> => {
  const server = await MongoMemoryServer.create()
  await mongoose.connect(server.getUri(), {
    dbName: 'scalecms-test'
  })
  return server
}
