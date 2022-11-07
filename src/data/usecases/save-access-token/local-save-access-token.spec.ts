import { SetStorage } from '@/data/protocols/cache'
import { SetStorageSpy } from '@/data/test/mock-storage'
import { faker } from '@faker-js/faker'
import { LocalSaveAccessToken } from './local-save-access-token'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageSpy: SetStorageSpy
}
const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorageSpy)
  return {
    sut,
    setStorageSpy
  }
}
describe('LocalSaveAccessToken', () => {
  it('should call set storage with correct value', async () => {
    const { sut, setStorageSpy } = makeSut()
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
