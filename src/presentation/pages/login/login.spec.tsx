import { Validation } from '@/presentation/protocols/validation'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import React from 'react'

import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)

  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  it('Should start with initial state', () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('Should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut()

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.input).toEqual({
      email: 'any_email'
    })
  })

  it('Should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut()

    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    expect(validationSpy.input).toEqual({
      password: 'any_password'
    })
  })
})
