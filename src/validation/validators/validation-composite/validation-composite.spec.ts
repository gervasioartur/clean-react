import { FieldValidationSpy } from '../test'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldsValidationSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldsValidationSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]
  const sut = new ValidationComposite(fieldsValidationSpy)

  return {
    sut,
    fieldsValidationSpy
  }
}

describe('ValidationComposite', () => {
  it('should return error if validation fails', () => {
    const { sut, fieldsValidationSpy } = makeSut()
    fieldsValidationSpy[0].error = new Error('first-any_error_message')
    fieldsValidationSpy[1].error = new Error('first-any_error_message')
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first-any_error_message')
  })
})
