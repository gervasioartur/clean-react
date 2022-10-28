import axios from 'axios'
import { faker } from '@faker-js/faker'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue({
    data: faker.random.words(),
    status: faker.datatype.number()
  })
  return mockedAxios
}
