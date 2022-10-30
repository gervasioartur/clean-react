import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) { }

  validate (value: string): Error {
    return value ? null : new RequiredFieldError()
  }
}
