import { Validation } from '@/presentation/protocols/validation'
import { FieldValidation } from '@/validation/protocols'

export class ValidationComposite implements Validation {
  constructor (private readonly validators: FieldValidation[]) { }
  validate (fieldName: string, fieldValue: any): string {
    const validators = this.validators.filter(v => v.field === fieldName)
    for (const validator of validators) {
      const error = validator.validate(fieldValue)
      if (error) return error.message
    }
  }
}
