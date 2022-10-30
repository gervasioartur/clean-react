import { InvalidFieldLengthError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly fieldName, private readonly minLength: number) { }
  validate (value: string): Error {
    return value.length >= this.minLength ? null : new InvalidFieldLengthError(this.fieldName, this.minLength)
  }
}
