import { InvalidFieldError } from '@/application/errors'

import validator from 'validator'

export class EmailValidator {
  constructor (private readonly value: string) {}

  validate (): Error | undefined {
    if (!validator.isEmail(this.value)) {
      return new InvalidFieldError('email')
    }
  }
}
