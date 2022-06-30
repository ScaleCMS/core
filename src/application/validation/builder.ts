import { EmailValidator, EqualsValidator, RequiredStringValidator, Validator } from '@/application/validation'

export class ValidationBuilder {
  private constructor (
    private readonly value: string,
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (params: {value: string, compareValue?: string, fieldName: string}): ValidationBuilder {
    return new ValidationBuilder(params.value, params.fieldName)
  }

  required (): ValidationBuilder {
    this.validators.push(new RequiredStringValidator(this.value, this.fieldName))
    return this
  }

  email (): ValidationBuilder {
    this.validators.push(new EmailValidator(this.value))
    return this
  }

  equals (compareValue: string): ValidationBuilder {
    this.validators.push(new EqualsValidator(this.value, compareValue, this.fieldName))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
