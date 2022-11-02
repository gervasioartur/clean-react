import { InvalidFieldLengthError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) { }
  validate (value: string): Error {
    value = value.replace(/\s/g, '')
    return value.length >= this.minLength ? null : new InvalidFieldLengthError(this.field, this.minLength)
  }
}
