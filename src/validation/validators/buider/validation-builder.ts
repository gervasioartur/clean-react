import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation'
import { EmailValidation } from '@/validation/validators'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]

  ) { }

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

    ó

    build (): FieldValidation[] {
      return this.validations
    }
}
