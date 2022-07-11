export const env = {
  bcryptSalt: Number(process.env.BCRYPT_SALT) ?? 10,
  port: process.env.PORT ?? 8080
}
