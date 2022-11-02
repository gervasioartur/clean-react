import React from 'react'
import { render } from '@testing-library/react'
import { Input } from '@/presentation/components'
import Context from '@/presentation/context/form-context'

describe('Input Component', () => {
  it('Should begin with readOnly', () => {
    const { getByTestId } = render(
      <Context.Provider value={{ state: {} }}>
        <Input name="field" />
      </Context.Provider>
    )
    const input = getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
