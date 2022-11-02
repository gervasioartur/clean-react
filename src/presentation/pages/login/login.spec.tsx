import 'jest-localstorage-mock'

import { InvalidCredentialsError } from '@/domain/errors'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const sut = render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
  )

  return {
    sut,
    validationStub,
    authenticationSpy
  }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const submitButton = sut.getByTestId('submit')
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
  const errorWrap = sut.getByTestId('error-wrap')
  expect(errorWrap.childElementCount).toBe(count)
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const element = sut.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

const testElementText = (sut: RenderResult, fieldName: string, textContent: string): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.textContent).toBe(textContent)
}

const testButtonIsDisable = (sut: RenderResult, fieldName: string, isDisable): void => {
  const submitButton = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(submitButton.disabled).toBe(isDisable)
}

describe('Login Component', () => {
  afterEach(cleanup)
  beforeEach(() => {
    localStorage.clear()
  })

  it('Should start with initial state', () => {
    const { sut, validationStub } = makeSut({ validationError: faker.random.words() })
    testErrorWrapChildCount(sut, 0)
    testButtonIsDisable(sut, 'submit', true)
    testStatusForField(sut, 'email', validationStub.errorMessage)
    testStatusForField(sut, 'password', validationStub.errorMessage)
  })

  it('Should show emailError if Validation fails', () => {
    const { sut, validationStub } = makeSut({ validationError: faker.random.words() })
    populateEmailField(sut)
    testStatusForField(sut, 'email', validationStub.errorMessage)
  })

  it('Should show passwordError if Validation fails', () => {
    const { sut, validationStub } = makeSut({ validationError: faker.random.words() })
    populatePasswordField(sut)
    testStatusForField(sut, 'password', validationStub.errorMessage)
  })

  it('Should show valid email if validation succeeds', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    testStatusForField(sut, 'email')
  })

  it('Should show valid password if validation succeeds', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    testStatusForField(sut, 'password')
  })

  it('Should show enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    populatePasswordField(sut)
    testButtonIsDisable(sut, 'submit', false)
  })

  it('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    testElementExists(sut, 'spinner')
  })

  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  it('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('Should not call Authentication if form is invalid', async () => {
    const { sut, authenticationSpy } = makeSut({ validationError: faker.random.words() })
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('Should present error if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit(sut)
    testErrorWrapChildCount(sut, 1)
    testElementText(sut, 'main-error', error.message)
  })

  it('Should add accessToken to localStorage on success', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('Should go to singup page', () => {
    const { sut } = makeSut()
    const register = sut.getByTestId('singup')
    fireEvent.click(register)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/singup')
  })
})
