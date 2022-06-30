import { InvalidFieldError } from '@/application/errors'

import validator from 'validator'

export class EqualsValidator {
  constructor (
    private readonly value: string,
    private readonly compareValue: string,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    if (!validator.equals(this.value, this.compareValue)) {
      return new InvalidFieldError(this.fieldName)
    }
  }
}
