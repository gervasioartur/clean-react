import { Validation } from '@/presentation/protocols/validation'
import { FieldValidation } from '@/validation/protocols'

export class ValidationComposite implements Validation {
  private constructor (private readonly validators: FieldValidation[]) { }

  static build (validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate (fieldName: string, fieldValue: any): string {
    const validators = this.validators.filter(v => v.field === fieldName)
    for (const validator of validators) {
      const error = validator.validate(fieldValue)
      if (error) return error.message
    }
  }
}
