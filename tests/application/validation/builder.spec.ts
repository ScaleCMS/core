import { ValidationBuilder, EmailValidator, EqualsValidator, RequiredStringValidator } from '@/application/validation'

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
