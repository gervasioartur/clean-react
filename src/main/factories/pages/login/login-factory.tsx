import { makeRemoteAuthentication } from '@/main/factories/useCases/authentication/remote-authentication-factory'
import { Login } from '@/presentation/pages'
import React from 'react'
import { makeSaveLocalSaveAccessToken } from '../../useCases/save-access-token/local-save-access-token-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken = {makeSaveLocalSaveAccessToken()}
    />
  )
}
