import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { Input } from '@/presentation/components'
import Context from '@/presentation/context/form-context'

const makeSUt = (): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name="field" />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  it('Should begin with readOnly', () => {
    const sut = makeSUt()
    const input = sut.getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
