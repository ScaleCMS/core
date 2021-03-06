import { Validator } from '@/application/validation'
import { RequiredFieldError } from '@/application/errors'

export class RequiredStringValidator implements Validator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    if (this.value === null || this.value === undefined || this.value === '') {
      return new RequiredFieldError(this.fieldName)
    }
  }
}
