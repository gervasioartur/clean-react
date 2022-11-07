import { SaveAccessToken } from '@/domain/useCases'

export class SaveAccessTokenMock implements SaveAccessToken {
  accessToken: string
  async save (accessToken: string): Promise<void> {
    this.accessToken = accessToken
  }
}
