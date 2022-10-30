export class InvalidFieldLengthError extends Error {
  constructor (fieldName: string, minLength: number) {
    super(`O campo ${fieldName} deve ter o número mínimo de  ${minLength}!`)
  }
}
