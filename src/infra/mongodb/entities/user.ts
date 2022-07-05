import mongoose, { Schema } from 'mongoose'

export const MongoUserModel = mongoose.model('User', new Schema({
  email: String,
  password: String,
  profile: {
    name: String
  }
}, { timestamps: true }))
