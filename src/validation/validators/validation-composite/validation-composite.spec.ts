import { FieldValidationSpy } from '../test'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  it('should return error if validation fails', () => {
    const fieldValidationSpy = new FieldValidationSpy('any_field')
    fieldValidationSpy.error = new Error('first-any_error_message')
    const fieldValidationSpy1 = new FieldValidationSpy('any_field')
    fieldValidationSpy1.error = new Error('second-any_error_message')
    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy1
    ])
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first-any_error_message')
  })
})
