import { makeRemoteAuthentication } from '@/main/factories/useCases/authentication/remote-authentication-factory'
import { Login } from '@/presentation/pages'
import React from 'react'
import { makeLoginValidation } from './login-validation-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()} />
  )
}
