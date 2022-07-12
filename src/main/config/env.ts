import dotenv from 'dotenv'

dotenv.config()

export const env = {
  database: {
    url: process.env.DB_URL ?? '',
    name: process.env.DB_NAME ?? 'scalecms'
  },
  port: process.env.PORT ?? 8080,
  bcryptSalt: Number(process.env.BCRYPT_SALT) ?? 10
}
