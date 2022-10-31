import { FieldValidation } from '@/validation/protocols'
import { FieldValidationSpy } from '../test'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  it('should return error if validation fails', () => {
    const fieldValidationSpy = new FieldValidationSpy('any_field')
    const fieldValidationSpy1 = new FieldValidationSpy('any_field')
    fieldValidationSpy1.error = new Error('any_error_message')
    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy1
    ])
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('any_error_message')
  })
})
