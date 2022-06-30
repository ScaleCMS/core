import { Validator } from '@/application/validation'
import { InvalidFieldError } from '@/application/errors'

import validator from 'validator'

export class EmailValidator implements Validator {
  constructor (private readonly value: string) {}

  validate (): Error | undefined {
    if (!validator.isEmail(this.value)) {
      return new InvalidFieldError('email')
    }
  }
}
