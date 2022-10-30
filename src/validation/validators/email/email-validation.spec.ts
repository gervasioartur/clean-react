import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { EmailValidation } from './email-validation'

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError('email'))
  })

  it('should return falsy if email is valid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
