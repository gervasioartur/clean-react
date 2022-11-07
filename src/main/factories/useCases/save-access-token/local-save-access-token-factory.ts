import { LocalSaveAccessToken } from '@/data/useCases/save-access-token/local-save-access-token'
import { SaveAccessToken } from '@/domain/useCases'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'

export const makeSaveLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
