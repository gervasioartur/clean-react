import { InvalidFieldLengthError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validator'

describe('MinLengthValidator', () => {
  it('should return error if value is invalid', () => {
    const sut = new MinLengthValidation('field', 'fieldName', 5)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldLengthError('fieldName', 5))
  })
})