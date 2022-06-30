export class SignUpController {
  handle (httpRequest: any): any {
    return {
      statusCode: 400
    }
  }
}

describe('SignupController', () => {
  it('should return 400 if name is not provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })
})
