import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { Login } from '@/presentation/pages'
import { ValidationBuilder } from '@/validation/validators/buider/validation-builder'
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'
import React from 'react'

export const makeLogin: React.FC = () => {
  const axiosHttpClient = new AxiosHttpClient()
  const url = 'http://fordevs.herokuapp.com/api/login'
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)

  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite} />
  )
}
