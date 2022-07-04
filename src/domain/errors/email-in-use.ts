export class EmailInUseError extends Error {
  constructor () {
    super('The email address is already in use')
    this.name = 'EmailInUseError'
  }
}
