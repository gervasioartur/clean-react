import { Input } from '@/presentation/components'
import Context from '@/presentation/context/form-context'
import { faker } from '@faker-js/faker'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import React from 'react'

const makeSUt = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  it('Should begin with readOnly', () => {
    const fieldName = faker.database.column()
    const sut = makeSUt(fieldName)
    const input = sut.getByTestId(fieldName) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  it('Should remove readOnly on focus', () => {
    const fieldName = faker.database.column()
    const sut = makeSUt(fieldName)
    const input = sut.getByTestId(fieldName) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
