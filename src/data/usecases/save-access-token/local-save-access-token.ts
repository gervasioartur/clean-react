import { SetStorage } from '@/data/protocols/cache'
import { SaveAccessToken } from '@/domain/useCases'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor (private readonly setStorage: SetStorage) { }

  async save (accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken)
    return Promise.resolve()
  }
}
