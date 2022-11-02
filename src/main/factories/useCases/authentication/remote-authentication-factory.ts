import { RemoteAuthentication } from '@/data/useCases/authentication/remote-authentication'
import { Authentication } from '@/domain/useCases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
}
