import { faker } from '@faker-js/faker'
import { FieldValidationSpy } from '@/validation/test'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldsValidationSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldsValidationSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = ValidationComposite.build(fieldsValidationSpy)

  return {
    sut,
    fieldsValidationSpy
  }
}

describe('ValidationComposite', () => {
  it('should return error if validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldsValidationSpy } = makeSut(fieldName)
    const errorMessage = faker.random.words()
    fieldsValidationSpy[0].error = new Error(errorMessage)
    fieldsValidationSpy[1].error = new Error(faker.random.words())
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(errorMessage)
  })

  it('should return falsy if validation  not fails', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBeFalsy()
  })
})
