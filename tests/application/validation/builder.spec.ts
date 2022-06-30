import { EmailValidator, EqualsValidator, RequiredStringValidator, Validator } from '@/application/validation'

class ValidationBuilder {
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

describe('ValidationBuilder', () => {
  it('should return a RequiredStringValidator', () => {
    const validators = ValidationBuilder
      .of({ value: 'any_value', fieldName: 'any_name' })
      .required()
      .build()

    expect(validators).toEqual([new RequiredStringValidator('any_value', 'any_name')])
  })

  it('should return a EmailValidator', () => {
    const validators = ValidationBuilder
      .of({ value: 'any_value', fieldName: 'any_name' })
      .email()
      .build()

    expect(validators).toEqual([new EmailValidator('any_value')])
  })

  it('should return a EqualsValidator', () => {
    const validators = ValidationBuilder
      .of({ value: 'any_value', fieldName: 'any_name' })
      .equals('compare_value')
      .build()

    expect(validators).toEqual([new EqualsValidator('any_value', 'compare_value', 'any_name')])
  })
})
